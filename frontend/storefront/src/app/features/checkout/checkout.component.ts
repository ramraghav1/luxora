import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { PaymentService } from '@core/services/payment.service';
import { ShippingAddress } from '@core/models/order.model';
import { ResolveImageUrlPipe } from '@shared/pipes/resolve-image-url.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ResolveImageUrlPipe],
  template: `
    <div class="checkout-page">
      <div class="container">
        <h1 class="checkout-page__title">Checkout</h1>

        @if (cartService.itemCount() === 0 && !orderComplete()) {
          <div class="checkout-empty">
            <p>Your cart is empty. Add some products first.</p>
            <a routerLink="/products" class="btn btn-primary">Browse Products</a>
          </div>
        } @else if (orderComplete()) {
          <div class="checkout-success">
            <div class="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <div class="order-details">
              <div class="detail-row">
                <span>Order ID:</span>
                <strong>{{ orderId() }}</strong>
              </div>
              <div class="detail-row">
                <span>Transaction:</span>
                <strong>{{ transactionId() }}</strong>
              </div>
              <div class="detail-row">
                <span>Amount Paid:</span>
                <strong>{{ amountPaid() | currency }}</strong>
              </div>
            </div>
            <p class="voucher-note">A payment voucher has been generated for your records.</p>
            <a routerLink="/" class="btn btn-primary">Continue Shopping</a>
          </div>
        } @else {
          <div class="checkout-layout">
            <!-- Shipping Form -->
            <div class="checkout-form">
              <div class="form-section">
                <h2>Shipping Information</h2>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input id="firstName" type="text" [(ngModel)]="address.firstName" required placeholder="John">
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input id="lastName" type="text" [(ngModel)]="address.lastName" required placeholder="Doe">
                  </div>
                  <div class="form-group full-width">
                    <label for="address1">Address *</label>
                    <input id="address1" type="text" [(ngModel)]="address.address1" required placeholder="123 Eco Street">
                  </div>
                  <div class="form-group full-width">
                    <label for="address2">Apartment, suite, etc.</label>
                    <input id="address2" type="text" [(ngModel)]="address.address2" placeholder="Apt 4B">
                  </div>
                  <div class="form-group">
                    <label for="city">City *</label>
                    <input id="city" type="text" [(ngModel)]="address.city" required placeholder="Portland">
                  </div>
                  <div class="form-group">
                    <label for="state">State *</label>
                    <input id="state" type="text" [(ngModel)]="address.state" required placeholder="Oregon">
                  </div>
                  <div class="form-group">
                    <label for="postalCode">Postal Code *</label>
                    <input id="postalCode" type="text" [(ngModel)]="address.postalCode" required placeholder="97201">
                  </div>
                  <div class="form-group">
                    <label for="country">Country *</label>
                    <input id="country" type="text" [(ngModel)]="address.country" required placeholder="United States">
                  </div>
                  <div class="form-group full-width">
                    <label for="phone">Phone *</label>
                    <input id="phone" type="tel" [(ngModel)]="address.phone" required placeholder="+1 (555) 000-0000">
                  </div>
                </div>
              </div>

              <div class="form-section">
                <h2>Payment Method</h2>
                <div class="payment-methods">
                  <label class="payment-option payment-option--active">
                    <input type="radio" name="payment" value="paypal" checked>
                    <div class="payment-option__content">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                      </svg>
                      <span>PayPal</span>
                      <small>Secure payment via PayPal</small>
                    </div>
                  </label>
                </div>
              </div>

              <button
                class="btn btn-primary btn-pay"
                [disabled]="isProcessing() || !isFormValid()"
                (click)="placeOrder()">
                @if (isProcessing()) {
                  <span class="spinner"></span> Processing...
                } @else {
                  Pay with PayPal — {{ cartService.subtotal() * 1.1 | currency }}
                }
              </button>

              @if (errorMessage()) {
                <div class="error-banner">{{ errorMessage() }}</div>
              }
            </div>

            <!-- Order Summary Sidebar -->
            <div class="checkout-summary">
              <h3>Order Summary</h3>
              <div class="summary-items">
                @for (item of cartService.items(); track item.productId) {
                  <div class="summary-item">
                    <img [src]="(item.imageUrl | resolveImageUrl) || 'https://placehold.co/60x60/e8f5e9/2d6a4f?text=Item'" [alt]="item.productName">
                    <div class="summary-item__info">
                      <span class="summary-item__name">{{ item.productName }}</span>
                      <span class="summary-item__qty">Qty: {{ item.quantity }}</span>
                    </div>
                    <span class="summary-item__price">{{ item.totalPrice | currency }}</span>
                  </div>
                }
              </div>
              <hr>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>{{ cartService.subtotal() | currency }}</span>
              </div>
              <div class="summary-row">
                <span>Tax (10%)</span>
                <span>{{ cartService.subtotal() * 0.1 | currency }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="free">FREE</span>
              </div>
              <hr>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>{{ cartService.subtotal() * 1.1 | currency }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .checkout-page { padding: 2rem 0 4rem; min-height: 60vh; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .checkout-page__title {
      font-size: 2rem; font-weight: 700; color: var(--color-text); margin-bottom: 2rem;
    }

    .checkout-empty, .checkout-success {
      text-align: center; padding: 3rem 2rem;
      p { color: var(--color-text-secondary); margin-bottom: 1.5rem; }
    }

    .checkout-success {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 3rem;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: var(--shadow-md);
    }

    .success-icon {
      color: var(--color-primary);
      margin-bottom: 1rem;
    }

    .checkout-success h2 {
      color: var(--color-primary);
      margin-bottom: 0.5rem;
    }

    .order-details {
      background: var(--color-bg);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin: 1.5rem 0;
      text-align: left;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--color-border);
      &:last-child { border-bottom: none; }
      span { color: var(--color-text-secondary); }
      strong { color: var(--color-text); font-size: 0.9rem; }
    }

    .voucher-note {
      font-size: 0.85rem;
      color: var(--color-primary);
      font-style: italic;
      margin-bottom: 1.5rem !important;
    }

    .checkout-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 2rem;
      align-items: start;
    }

    .form-section {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-sm);
      h2 { font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--color-text); }
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
      input {
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        font-size: 0.95rem;
        background: var(--color-bg);
        color: var(--color-text);
        transition: border-color 0.2s;
        &:focus { outline: none; border-color: var(--color-primary); }
      }
    }

    .full-width { grid-column: 1 / -1; }

    .payment-methods { display: flex; flex-direction: column; gap: 0.75rem; }

    .payment-option {
      cursor: pointer;
      input { display: none; }
    }

    .payment-option__content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      transition: all 0.2s;
      svg { color: #003087; }
      span { font-weight: 600; color: var(--color-text); }
      small { color: var(--color-text-secondary); margin-left: auto; }
    }

    .payment-option--active .payment-option__content {
      border-color: var(--color-primary);
      background: var(--color-primary-light);
    }

    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 1rem 2rem; border-radius: var(--radius-md);
      font-weight: 600; text-decoration: none; transition: all 0.2s;
      cursor: pointer; border: none; font-size: 1rem;
    }
    .btn-primary {
      background: var(--color-primary); color: white;
      &:hover { background: var(--color-primary-dark); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .btn-pay { width: 100%; font-size: 1.1rem; padding: 1.1rem; }

    .spinner {
      display: inline-block; width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,.3); border-radius: 50%;
      border-top-color: white; animation: spin 0.8s linear infinite;
      margin-right: 0.5rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .error-banner {
      margin-top: 1rem; padding: 1rem;
      background: #fee; border: 1px solid #fcc;
      border-radius: var(--radius-md); color: #c53030;
      font-size: 0.9rem;
    }

    .checkout-summary {
      position: sticky; top: 6rem;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      h3 { font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--color-text); }
    }

    .summary-items { max-height: 300px; overflow-y: auto; }

    .summary-item {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem 0; border-bottom: 1px solid var(--color-border);
      img { width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover; }
    }

    .summary-item__info {
      flex: 1; display: flex; flex-direction: column;
    }
    .summary-item__name { font-size: 0.85rem; font-weight: 600; color: var(--color-text); }
    .summary-item__qty { font-size: 0.75rem; color: var(--color-text-secondary); }
    .summary-item__price { font-weight: 600; font-size: 0.9rem; }

    hr { border: none; border-top: 1px solid var(--color-border); margin: 1rem 0; }

    .summary-row {
      display: flex; justify-content: space-between;
      margin-bottom: 0.6rem; font-size: 0.9rem; color: var(--color-text-secondary);
    }
    .summary-total { font-size: 1.2rem; font-weight: 700; color: var(--color-text); margin-top: 0.5rem; }
    .free { color: var(--color-primary); font-weight: 600; }

    @media (max-width: 768px) {
      .checkout-layout { grid-template-columns: 1fr; }
      .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CheckoutComponent {
  readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);

  address: ShippingAddress = {
    firstName: '', lastName: '',
    address1: '', address2: '',
    city: '', state: '',
    postalCode: '', country: '',
    phone: ''
  };

  isProcessing = signal(false);
  errorMessage = signal('');
  orderComplete = signal(false);
  orderId = signal('');
  transactionId = signal('');
  amountPaid = signal(0);

  isFormValid(): boolean {
    const a = this.address;
    return !!(a.firstName && a.lastName && a.address1 && a.city && a.state && a.postalCode && a.country && a.phone);
  }

  placeOrder(): void {
    if (!this.isFormValid()) return;
    this.isProcessing.set(true);
    this.errorMessage.set('');

    const items = this.cartService.items().map(item => ({
      productId: item.productId,
      productName: item.productName,
      imageUrl: item.imageUrl,
      unitPrice: item.unitPrice,
      quantity: item.quantity
    }));

    // Step 1: Create order in backend
    this.orderService.createOrder({
      items,
      shippingAddress: this.address
    }).subscribe({
      next: (order) => {
        // Step 2: Create PayPal payment
        this.paymentService.createPayPalOrder(order.id, order.totalAmount).subscribe({
          next: (paypalResponse) => {
            if (paypalResponse.approvalUrl) {
              // Redirect to PayPal for approval
              window.location.href = paypalResponse.approvalUrl;
            } else {
              // No approval URL (sandbox might auto-approve)
              this.capturePayment(paypalResponse.payPalOrderId, order.id, order.totalAmount);
            }
          },
          error: (err) => {
            this.isProcessing.set(false);
            this.errorMessage.set(err.error?.message || 'Failed to create PayPal payment. Please try again.');
          }
        });
      },
      error: (err) => {
        this.isProcessing.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to create order. Please try again.');
      }
    });
  }

  private capturePayment(payPalOrderId: string, orderId: string, amount: number): void {
    this.paymentService.capturePayPalOrder(payPalOrderId).subscribe({
      next: (payment) => {
        this.isProcessing.set(false);
        this.orderComplete.set(true);
        this.orderId.set(orderId);
        this.transactionId.set(payment.transactionId || payPalOrderId);
        this.amountPaid.set(amount);
        this.cartService.clearCart();
      },
      error: (err) => {
        this.isProcessing.set(false);
        this.errorMessage.set(err.error?.message || 'Payment capture failed. Please contact support.');
      }
    });
  }
}

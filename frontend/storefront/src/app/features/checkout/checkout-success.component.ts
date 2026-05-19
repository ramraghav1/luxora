import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaymentService } from '@core/services/payment.service';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="success-page">
      <div class="container">
        @if (isLoading()) {
          <div class="loading">
            <div class="spinner-large"></div>
            <p>Processing your payment...</p>
          </div>
        } @else if (error()) {
          <div class="error-card">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <h2>Payment Issue</h2>
            <p>{{ error() }}</p>
            <a routerLink="/checkout" class="btn btn-primary">Try Again</a>
          </div>
        } @else {
          <div class="success-card">
            <div class="success-icon">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your eco-friendly purchase!</p>

            <div class="order-info">
              <div class="info-row">
                <span>Transaction ID:</span>
                <strong>{{ transactionId() }}</strong>
              </div>
              <div class="info-row">
                <span>Amount Paid:</span>
                <strong>{{ amountPaid() | currency }}</strong>
              </div>
              <div class="info-row">
                <span>Status:</span>
                <strong class="status-success">Confirmed</strong>
              </div>
            </div>

            <p class="note">A payment receipt voucher has been generated and stored for your records.</p>

            <div class="actions">
              <a routerLink="/" class="btn btn-primary">Continue Shopping</a>
              <a routerLink="/orders" class="btn btn-outline">View Orders</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .success-page { padding: 3rem 0; min-height: 60vh; display: flex; align-items: center; }
    .container { max-width: 600px; margin: 0 auto; padding: 0 1.5rem; width: 100%; }

    .loading {
      text-align: center;
      p { color: var(--color-text-secondary); margin-top: 1rem; }
    }

    .spinner-large {
      width: 48px; height: 48px; margin: 0 auto;
      border: 3px solid var(--color-border); border-radius: 50%;
      border-top-color: var(--color-primary);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .success-card, .error-card {
      text-align: center;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 3rem 2rem;
      box-shadow: var(--shadow-lg);
    }

    .success-icon { color: var(--color-primary); margin-bottom: 1.5rem; }

    .success-card h1 {
      font-size: 1.8rem; color: var(--color-primary); margin-bottom: 0.5rem;
    }
    .success-card > p { color: var(--color-text-secondary); margin-bottom: 2rem; }

    .error-card {
      svg { color: #e53e3e; margin-bottom: 1rem; }
      h2 { color: #e53e3e; margin-bottom: 0.5rem; }
      p { color: var(--color-text-secondary); margin-bottom: 1.5rem; }
    }

    .order-info {
      background: var(--color-bg);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .info-row {
      display: flex; justify-content: space-between;
      padding: 0.6rem 0;
      border-bottom: 1px solid var(--color-border);
      &:last-child { border-bottom: none; }
      span { color: var(--color-text-secondary); }
      strong { color: var(--color-text); }
    }

    .status-success { color: var(--color-primary) !important; }

    .note {
      font-size: 0.85rem; color: var(--color-primary);
      font-style: italic; margin-bottom: 2rem;
    }

    .actions { display: flex; gap: 1rem; justify-content: center; }

    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0.85rem 1.5rem; border-radius: var(--radius-md);
      font-weight: 600; text-decoration: none; transition: all 0.2s;
      cursor: pointer; border: none; font-size: 0.95rem;
    }
    .btn-primary {
      background: var(--color-primary); color: white;
      &:hover { background: var(--color-primary-dark); }
    }
    .btn-outline {
      background: transparent; border: 1px solid var(--color-border); color: var(--color-text);
      &:hover { border-color: var(--color-primary); color: var(--color-primary); }
    }
  `]
})
export class CheckoutSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly paymentService = inject(PaymentService);
  private readonly cartService = inject(CartService);

  isLoading = signal(true);
  error = signal('');
  transactionId = signal('');
  amountPaid = signal(0);

  ngOnInit(): void {
    // PayPal redirects back with token (PayPal order ID) in query params
    const params = this.route.snapshot.queryParams;
    const token = params['token']; // PayPal order ID

    if (!token) {
      this.isLoading.set(false);
      this.error.set('No payment token found. Please try again.');
      return;
    }

    // Capture the payment
    this.paymentService.capturePayPalOrder(token).subscribe({
      next: (payment) => {
        this.isLoading.set(false);
        this.transactionId.set(payment.transactionId || token);
        this.amountPaid.set(payment.amount);
        this.cartService.clearCart();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || 'Payment capture failed. Please contact support.');
      }
    });
  }
}

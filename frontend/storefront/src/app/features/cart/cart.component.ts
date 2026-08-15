import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { ResolveImageUrlPipe } from '@shared/pipes/resolve-image-url.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ResolveImageUrlPipe],
  template: `
    <div class="cart-page">
      <div class="container">
        <h1 class="cart-page__title">Shopping Cart</h1>

        @if (cartService.itemCount() === 0) {
          <div class="cart-empty">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any eco-friendly products yet.</p>
            <a routerLink="/products" class="btn btn-primary">Continue Shopping</a>
          </div>
        } @else {
          <div class="cart-layout">
            <div class="cart-items">
              @for (item of cartService.items(); track item.productId) {
                <div class="cart-item">
                  <a [routerLink]="['/products', item.slug]" class="cart-item__image">
                    <img [src]="(item.imageUrl | resolveImageUrl) || 'https://placehold.co/120x150/e8f5e9/2d6a4f?text=' + item.productName" [alt]="item.productName">
                  </a>
                  <div class="cart-item__details">
                    <a [routerLink]="['/products', item.slug]" class="cart-item__name">{{ item.productName }}</a>
                    <span class="cart-item__price">{{ item.unitPrice | currency }}</span>
                  </div>
                  <div class="cart-item__quantity">
                    <button class="qty-btn" (click)="cartService.updateQuantity(item.productId, item.quantity - 1)">−</button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button class="qty-btn" (click)="cartService.updateQuantity(item.productId, item.quantity + 1)">+</button>
                  </div>
                  <div class="cart-item__total">
                    {{ item.totalPrice | currency }}
                  </div>
                  <button class="cart-item__remove" (click)="cartService.removeFromCart(item.productId)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              }
            </div>

            <div class="cart-summary">
              <h3>Order Summary</h3>
              <div class="summary-row">
                <span>Subtotal ({{ cartService.itemCount() }} items)</span>
                <span>{{ cartService.subtotal() | currency }}</span>
              </div>
              <div class="summary-row">
                <span>Estimated Tax (10%)</span>
                <span>{{ cartService.subtotal() * 0.1 | currency }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="free-shipping">FREE</span>
              </div>
              <hr>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>{{ cartService.subtotal() * 1.1 | currency }}</span>
              </div>
              <a routerLink="/checkout" class="btn btn-primary btn-full">
                Proceed to Checkout
              </a>
              <a routerLink="/products" class="btn btn-outline btn-full">
                Continue Shopping
              </a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      padding: 2rem 0 4rem;
      min-height: 60vh;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .cart-page__title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 2rem;
    }

    .cart-empty {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--color-text-secondary);
      svg { color: var(--color-primary); opacity: 0.5; margin-bottom: 1rem; }
      h2 { color: var(--color-text); margin-bottom: 0.5rem; }
      p { margin-bottom: 1.5rem; }
    }

    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 2rem;
      align-items: start;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto auto auto;
      gap: 1rem;
      align-items: center;
      padding: 1.5rem;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      margin-bottom: 1rem;
      box-shadow: var(--shadow-sm);
    }

    .cart-item__image {
      width: 100px;
      height: 120px;
      border-radius: var(--radius-md);
      overflow: hidden;
      img { width: 100%; height: 100%; object-fit: cover; }
    }

    .cart-item__details {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .cart-item__name {
      font-weight: 600;
      color: var(--color-text);
      text-decoration: none;
      &:hover { color: var(--color-primary); }
    }

    .cart-item__price {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }

    .cart-item__quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .qty-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-full);
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      &:hover { border-color: var(--color-primary); color: var(--color-primary); }
    }

    .qty-value {
      min-width: 2rem;
      text-align: center;
      font-weight: 600;
    }

    .cart-item__total {
      font-weight: 700;
      color: var(--color-text);
      min-width: 80px;
      text-align: right;
    }

    .cart-item__remove {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      color: var(--color-text-secondary);
      border-radius: var(--radius-full);
      transition: all 0.2s;
      &:hover { color: #e53e3e; background: #fee; }
    }

    .cart-summary {
      position: sticky;
      top: 6rem;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-md);

      h3 { font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--color-text); }
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.8rem;
      color: var(--color-text-secondary);
      font-size: 0.95rem;
    }

    .summary-total {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text);
      margin-top: 1rem;
    }

    .free-shipping { color: var(--color-primary); font-weight: 600; }

    hr { border: none; border-top: 1px solid var(--color-border); margin: 1rem 0; }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem 1.5rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
      font-size: 0.95rem;
    }
    .btn-primary {
      background: var(--color-primary);
      color: white;
      &:hover { background: var(--color-primary-dark); }
    }
    .btn-outline {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text);
      &:hover { border-color: var(--color-primary); color: var(--color-primary); }
    }
    .btn-full { width: 100%; margin-top: 0.75rem; }

    @media (max-width: 768px) {
      .cart-layout { grid-template-columns: 1fr; }
      .cart-item { grid-template-columns: 80px 1fr; gap: 0.75rem; }
      .cart-item__quantity, .cart-item__total, .cart-item__remove {
        grid-column: 2;
      }
    }
  `]
})
export class CartComponent {
  readonly cartService = inject(CartService);
}

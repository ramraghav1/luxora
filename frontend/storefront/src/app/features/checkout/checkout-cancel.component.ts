import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-cancel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cancel-page">
      <div class="container">
        <div class="cancel-card">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <h2>Payment Cancelled</h2>
          <p>You cancelled the payment. Your cart items are still saved.</p>
          <div class="actions">
            <a routerLink="/checkout" class="btn btn-primary">Return to Checkout</a>
            <a routerLink="/cart" class="btn btn-outline">View Cart</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cancel-page { padding: 3rem 0; min-height: 60vh; display: flex; align-items: center; }
    .container { max-width: 500px; margin: 0 auto; padding: 0 1.5rem; }
    .cancel-card {
      text-align: center;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 3rem 2rem;
      box-shadow: var(--shadow-md);
      svg { color: #ed8936; margin-bottom: 1rem; }
      h2 { color: var(--color-text); margin-bottom: 0.5rem; }
      p { color: var(--color-text-secondary); margin-bottom: 2rem; }
    }
    .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0.85rem 1.5rem; border-radius: var(--radius-md);
      font-weight: 600; text-decoration: none; transition: all 0.2s;
      cursor: pointer; border: none; font-size: 0.95rem;
    }
    .btn-primary { background: var(--color-primary); color: white; &:hover { background: var(--color-primary-dark); } }
    .btn-outline { background: transparent; border: 1px solid var(--color-border); color: var(--color-text); &:hover { border-color: var(--color-primary); color: var(--color-primary); } }
  `]
})
export class CheckoutCancelComponent {}

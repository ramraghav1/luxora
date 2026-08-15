import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RegisterRequest } from '@core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="register-page">
      <div class="container">
        <div class="register-card">
          <h1 class="register-page__title">Create Your Account</h1>
          <p class="register-page__subtitle">Join LUXEPOUCH to track orders and save your favorites.</p>

          <div class="form-grid">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input id="firstName" type="text" [(ngModel)]="model.firstName" name="firstName" required placeholder="Jane" />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input id="lastName" type="text" [(ngModel)]="model.lastName" name="lastName" required placeholder="Doe" />
            </div>
            <div class="form-group full-width">
              <label for="email">Email *</label>
              <input id="email" type="email" [(ngModel)]="model.email" name="email" required placeholder="jane&#64;example.com" />
            </div>
            <div class="form-group full-width">
              <label for="phone">Phone</label>
              <input id="phone" type="tel" [(ngModel)]="model.phone" name="phone" placeholder="+1 (555) 000-0000" />
            </div>
            <div class="form-group">
              <label for="password">Password *</label>
              <input id="password" type="password" [(ngModel)]="model.password" name="password" required minlength="6" placeholder="At least 6 characters" />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password *</label>
              <input id="confirmPassword" type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required placeholder="Re-enter password" />
            </div>
          </div>

          @if (confirmPassword && model.password !== confirmPassword) {
            <div class="field-error">Passwords do not match.</div>
          }

          @if (errorMessage()) {
            <div class="error-banner">{{ errorMessage() }}</div>
          }

          <button
            class="btn btn-primary btn-register"
            [disabled]="isProcessing() || !isFormValid()"
            (click)="register()">
            @if (isProcessing()) {
              <span class="spinner"></span> Creating Account...
            } @else {
              Register & Continue
            }
          </button>

          <p class="register-page__login-link">
            Already have an account? <a routerLink="/auth/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-page { padding: 2rem 0 4rem; min-height: 60vh; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

    .register-card {
      max-width: 520px;
      margin: 0 auto;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
      box-shadow: var(--shadow-sm);
    }

    .register-page__title {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--color-text);
    }

    .register-page__subtitle {
      color: var(--color-text-secondary);
      margin: 0.5rem 0 1.75rem;
      font-size: 0.95rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      &.full-width {
        grid-column: 1 / -1;
      }

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

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
      }
    }

    .field-error {
      color: var(--color-error, #d92d20);
      font-size: 0.82rem;
      margin: 0.6rem 0;
    }

    .error-banner {
      margin: 1rem 0;
      padding: 0.85rem 1rem;
      background: rgba(217, 45, 32, 0.08);
      border: 1px solid rgba(217, 45, 32, 0.25);
      border-radius: var(--radius-md);
      color: #d92d20;
      font-size: 0.88rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
      font-size: 1rem;
    }

    .btn-primary {
      background: var(--color-primary);
      color: #fff;

      &:hover:not(:disabled) {
        background: var(--color-primary-dark, var(--color-primary));
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-register {
      width: 100%;
      margin-top: 1.25rem;
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: #fff;
      border-radius: 50%;
      display: inline-block;
      margin-right: 0.5rem;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .register-page__login-link {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.88rem;
      color: var(--color-text-muted);

      a {
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: underline;
      }
    }

    @media (max-width: 480px) {
      .register-card { padding: 1.75rem; }
      .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  model: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  };
  confirmPassword = '';

  isProcessing = signal(false);
  errorMessage = signal<string | null>(null);

  isFormValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !!(
      this.model.firstName.trim() &&
      this.model.lastName.trim() &&
      emailPattern.test(this.model.email) &&
      this.model.password.length >= 6 &&
      this.model.password === this.confirmPassword
    );
  }

  register(): void {
    if (!this.isFormValid() || this.isProcessing()) return;

    this.isProcessing.set(true);
    this.errorMessage.set(null);

    const payload: RegisterRequest = {
      ...this.model,
      phone: this.model.phone?.trim() || undefined
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isProcessing.set(false);
        this.errorMessage.set(err?.error?.message || 'Something went wrong. Please try again.');
      }
    });
  }
}

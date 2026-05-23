import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-page__visual">
        <div class="auth-page__visual-content">
          <div class="auth-page__brand">LUXORA</div>
          <h2 class="auth-page__tagline">Admin Portal</h2>
          <p class="auth-page__description">
            Don't worry, we'll help you get back into your account.
          </p>
        </div>
      </div>

      <div class="auth-page__form-area">
        <div class="auth-card">
          @if (!emailSent) {
            <div class="auth-card__header">
              <h1 class="auth-card__title">Reset Password</h1>
              <p class="auth-card__subtitle">Enter your email and we'll send you a reset link</p>
            </div>

            <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="auth-form">
              @if (errorMessage) {
                <div class="auth-form__error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {{ errorMessage }}
                </div>
              }

              <div class="form-group">
                <label class="form-label" for="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  class="form-input"
                  formControlName="email"
                  placeholder="admin&#64;luxora.com"
                  autocomplete="email"
                />
                @if (forgotForm.get('email')?.touched && forgotForm.get('email')?.errors?.['required']) {
                  <span class="form-error">Email is required</span>
                }
                @if (forgotForm.get('email')?.touched && forgotForm.get('email')?.errors?.['email']) {
                  <span class="form-error">Enter a valid email</span>
                }
              </div>

              <button
                type="submit"
                class="auth-btn"
                [disabled]="forgotForm.invalid || isLoading">
                @if (isLoading) {
                  <span class="auth-btn__spinner"></span>
                  Sending...
                } @else {
                  Send Reset Link
                }
              </button>

              <a routerLink="/auth/login" class="auth-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to Sign In
              </a>
            </form>
          } @else {
            <div class="auth-card__header">
              <div class="auth-success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h1 class="auth-card__title">Check your email</h1>
              <p class="auth-card__subtitle">
                We've sent a password reset link to <strong>{{ forgotForm.get('email')?.value }}</strong>
              </p>
            </div>

            <a routerLink="/auth/login" class="auth-btn" style="text-decoration: none; text-align: center;">
              Back to Sign In
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }

    .auth-page__visual {
      background: linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(201, 169, 110, 0.08) 0%, transparent 70%);
      }
    }

    .auth-page__visual-content {
      position: relative;
      z-index: 1;
      color: #fff;
      max-width: 400px;
    }

    .auth-page__brand {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.5rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: #c9a96e;
      margin-bottom: 1.5rem;
    }

    .auth-page__tagline {
      font-size: 1.75rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }

    .auth-page__description {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.7;
    }

    .auth-page__form-area {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      background: #fafafa;
    }

    .auth-card { width: 100%; max-width: 400px; }

    .auth-card__header { margin-bottom: 2rem; }

    .auth-card__title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.75rem;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 0.5rem;
    }

    .auth-card__subtitle { color: #8a8a9a; font-size: 0.9rem; line-height: 1.5; }

    .auth-success-icon { margin-bottom: 1.5rem; }

    .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }

    .auth-form__error {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1rem; background: #fef2f2;
      border: 1px solid #fecaca; border-radius: 8px;
      color: #dc2626; font-size: 0.85rem; font-weight: 500;
    }

    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }

    .form-label { font-size: 0.82rem; font-weight: 600; color: #4a4a5a; }

    .form-input {
      width: 100%; padding: 0.8rem 1rem;
      border: 1.5px solid #e8e8ec; border-radius: 8px;
      font-size: 0.9rem; background: #fff; color: #1a1a2e;
      transition: border-color 0.2s, box-shadow 0.2s;
      &::placeholder { color: #b0b0c0; }
      &:focus { outline: none; border-color: #c9a96e; box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.1); }
    }

    .form-error { font-size: 0.75rem; color: #dc2626; font-weight: 500; }

    .auth-btn {
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      width: 100%; padding: 0.9rem; margin-top: 0.5rem;
      background: #1a1a2e; color: #fff; border: none; border-radius: 8px;
      font-size: 0.9rem; font-weight: 600; cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      &:hover:not(:disabled) { background: #0f0f1a; transform: translateY(-1px); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }

    .auth-btn__spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff; border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    .auth-back-link {
      display: flex; align-items: center; justify-content: center; gap: 0.4rem;
      color: #8a8a9a; text-decoration: none; font-size: 0.85rem; font-weight: 500;
      margin-top: 0.5rem;
      &:hover { color: #4a4a5a; }
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 768px) {
      .auth-page { grid-template-columns: 1fr; }
      .auth-page__visual { display: none; }
    }
  `]
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  forgotForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isLoading = false;
  emailSent = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.forgotPassword({ email: this.forgotForm.getRawValue().email }).subscribe({
      next: () => {
        this.isLoading = false;
        this.emailSent = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}

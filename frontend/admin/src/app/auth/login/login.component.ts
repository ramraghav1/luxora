import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-page__visual">
        <div class="auth-page__visual-content">
          <div class="auth-page__brand">LUXORA</div>
          <h2 class="auth-page__tagline">Admin Portal</h2>
          <p class="auth-page__description">
            Manage your products, orders, and customers from one powerful dashboard.
          </p>
        </div>
      </div>

      <div class="auth-page__form-area">
        <div class="auth-card">
          <div class="auth-card__header">
            <h1 class="auth-card__title">Welcome back</h1>
            <p class="auth-card__subtitle">Sign in to your admin account</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
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
              @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']) {
                <span class="form-error">Email is required</span>
              }
              @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['email']) {
                <span class="form-error">Enter a valid email</span>
              }
            </div>

            <div class="form-group">
              <div class="form-label-row">
                <label class="form-label" for="password">Password</label>
                <a routerLink="/auth/forgot-password" class="form-link">Forgot password?</a>
              </div>
              <div class="form-input-wrapper">
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  class="form-input"
                  formControlName="password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
                <button type="button" class="form-input-toggle" (click)="showPassword = !showPassword">
                  @if (showPassword) {
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  } @else {
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  }
                </button>
              </div>
              @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']) {
                <span class="form-error">Password is required</span>
              }
            </div>

            <button
              type="submit"
              class="auth-btn"
              [disabled]="loginForm.invalid || isLoading">
              @if (isLoading) {
                <span class="auth-btn__spinner"></span>
                Signing in...
              } @else {
                Sign In
              }
            </button>
          </form>
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

      &::after {
        content: '';
        position: absolute;
        bottom: -30%;
        left: -30%;
        width: 80%;
        height: 80%;
        background: radial-gradient(circle, rgba(201, 169, 110, 0.05) 0%, transparent 60%);
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
      line-height: 1.3;
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

    .auth-card {
      width: 100%;
      max-width: 400px;
    }

    .auth-card__header {
      margin-bottom: 2rem;
    }

    .auth-card__title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.75rem;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 0.5rem;
    }

    .auth-card__subtitle {
      color: #8a8a9a;
      font-size: 0.9rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .auth-form__error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #dc2626;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #4a4a5a;
      letter-spacing: 0.02em;
    }

    .form-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-link {
      font-size: 0.8rem;
      color: #c9a96e;
      text-decoration: none;
      font-weight: 500;
      &:hover { text-decoration: underline; }
    }

    .form-input-wrapper {
      position: relative;
    }

    .form-input {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1.5px solid #e8e8ec;
      border-radius: 8px;
      font-size: 0.9rem;
      background: #fff;
      color: #1a1a2e;
      transition: border-color 0.2s, box-shadow 0.2s;

      &::placeholder { color: #b0b0c0; }

      &:focus {
        outline: none;
        border-color: #c9a96e;
        box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.1);
      }
    }

    .form-input-toggle {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #8a8a9a;
      padding: 0.25rem;
      display: flex;
      &:hover { color: #4a4a5a; }
    }

    .form-error {
      font-size: 0.75rem;
      color: #dc2626;
      font-weight: 500;
    }

    .auth-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.9rem;
      margin-top: 0.5rem;
      background: #1a1a2e;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;

      &:hover:not(:disabled) {
        background: #0f0f1a;
        transform: translateY(-1px);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .auth-btn__spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .auth-page {
        grid-template-columns: 1fr;
      }
      .auth-page__visual {
        display: none;
      }
    }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isLoading = false;
  showPassword = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password';
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@core/services/theme.service';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header__top-bar">
        <div class="container">
          <span class="header__eco-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
            Free Shipping on Orders Over $150
          </span>
          <div class="header__top-actions">
            <button class="theme-switcher" (click)="toggleThemeMenu()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </button>
            @if (showThemeMenu) {
              <div class="theme-menu">
                @for (theme of themeService.themes(); track theme.name) {
                  <button
                    class="theme-menu__item"
                    [class.active]="theme.name === themeService.currentTheme().name"
                    (click)="selectTheme(theme.name)">
                    {{ theme.displayName }}
                  </button>
                }
              </div>
            }
            <a routerLink="/auth/login" class="header__link">Sign In</a>
          </div>
        </div>
      </div>

      <div class="header__main">
        <div class="container header__content">
          <a routerLink="/" class="header__logo">
            <span class="header__logo-text">LUXORA</span>
          </a>

          <nav class="header__nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/products" routerLinkActive="active">Shop</a>
            <a routerLink="/products" [queryParams]="{tag: 'new'}" routerLinkActive="active">New Arrivals</a>
            <a routerLink="/products" [queryParams]="{tag: 'sale'}" routerLinkActive="active">Sale</a>
            <a routerLink="/products" [queryParams]="{tag: 'premium'}" routerLinkActive="active">Premium</a>
          </nav>

          <div class="header__actions">
            <button class="header__action-btn" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <a routerLink="/cart" class="header__action-btn header__cart-btn" aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              @if (cartService.itemCount() > 0) {
                <span class="header__cart-count">{{ cartService.itemCount() }}</span>
              }
            </a>
            <a routerLink="/orders" class="header__action-btn" aria-label="Orders">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/>
              </svg>
            </a>
          </div>

          <button class="header__mobile-toggle" (click)="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              @if (mobileMenuOpen) {
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              } @else {
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              }
            </svg>
          </button>
        </div>
      </div>

      @if (mobileMenuOpen) {
        <div class="header__mobile-menu">
          <nav class="header__mobile-nav">
            <a routerLink="/" (click)="mobileMenuOpen = false">Home</a>
            <a routerLink="/products" (click)="mobileMenuOpen = false">Shop</a>
            <a routerLink="/products" [queryParams]="{tag: 'new'}" (click)="mobileMenuOpen = false">New Arrivals</a>
            <a routerLink="/products" [queryParams]="{tag: 'sale'}" (click)="mobileMenuOpen = false">Sale</a>
            <a routerLink="/products" [queryParams]="{tag: 'premium'}" (click)="mobileMenuOpen = false">Premium</a>
            <a routerLink="/cart" (click)="mobileMenuOpen = false">Cart</a>
            <a routerLink="/orders" (click)="mobileMenuOpen = false">Orders</a>
            <a routerLink="/auth/login" (click)="mobileMenuOpen = false">Sign In</a>
          </nav>
        </div>
      }
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--color-surface);
      box-shadow: var(--shadow-sm);
    }

    .header__top-bar {
      background: var(--gradient-primary);
      color: var(--color-text-inverse);
      padding: 0.5rem 0;
      font-size: 0.8rem;

      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .header__eco-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .header__top-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
    }

    .header__link {
      color: var(--color-text-inverse);
      text-decoration: none;
      font-weight: 500;
      opacity: 0.9;
      transition: opacity var(--transition-fast);
      &:hover { opacity: 1; }
    }

    .theme-switcher {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: var(--radius-full);
      padding: 0.35rem;
      cursor: pointer;
      color: var(--color-text-inverse);
      display: flex;
      align-items: center;
      transition: background var(--transition-fast);
      &:hover { background: rgba(255,255,255,0.25); }
    }

    .theme-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: var(--color-surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      min-width: 160px;
      z-index: 100;
    }

    .theme-menu__item {
      display: block;
      width: 100%;
      padding: 0.7rem 1rem;
      border: none;
      background: none;
      text-align: left;
      color: var(--color-text);
      cursor: pointer;
      font-size: 0.85rem;
      transition: background var(--transition-fast);
      &:hover { background: var(--color-bg-secondary); }
      &.active { 
        background: var(--color-primary-50);
        color: var(--color-primary);
        font-weight: 600;
      }
    }

    .header__main {
      padding: 1rem 0;
    }

    .header__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .header__logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: var(--color-primary);
    }

    .header__logo-text {
      font-family: var(--font-display);
      font-size: 1.7rem;
      font-weight: 600;
      color: var(--color-primary-dark);
      letter-spacing: 0.08em;
    }

    .header__nav {
      display: flex;
      gap: 2.5rem;

      a {
        color: var(--color-text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        padding: 0.4rem 0;
        border-bottom: 2px solid transparent;
        transition: all var(--transition-fast);

        &:hover, &.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
      }
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header__action-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: var(--radius-full);
      background: var(--color-bg-secondary);
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-primary-100);
        color: var(--color-primary);
      }
    }

    .header__cart-count {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      background: var(--color-primary);
      color: var(--color-text-inverse);
      border-radius: var(--radius-full);
      font-size: 0.65rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header__mobile-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--color-text);
      cursor: pointer;
      padding: 0.5rem;
    }

    .header__mobile-menu {
      background: var(--color-surface);
      border-top: 1px solid var(--color-border-light);
      padding: 1rem 0;
    }

    .header__mobile-nav {
      display: flex;
      flex-direction: column;
      padding: 0 1.5rem;

      a {
        padding: 0.8rem 0;
        color: var(--color-text);
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid var(--color-border-light);
      }
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    @media (max-width: 768px) {
      .header__nav, .header__actions { display: none; }
      .header__mobile-toggle { display: block; }
      .header__top-bar { display: none; }
    }
  `]
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly cartService = inject(CartService);
  mobileMenuOpen = false;
  showThemeMenu = false;

  toggleThemeMenu(): void {
    this.showThemeMenu = !this.showThemeMenu;
  }

  selectTheme(name: string): void {
    this.themeService.setTheme(name);
    this.showThemeMenu = false;
  }
}

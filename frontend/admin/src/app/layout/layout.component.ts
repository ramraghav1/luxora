import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { AdminThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout" [class.layout--collapsed]="sidebarCollapsed()">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar__header">
          <span class="sidebar__brand">LuxePouch</span>
          <span class="sidebar__badge">Admin</span>
        </div>

        <nav class="sidebar__nav">
          <div class="sidebar__section">
            <span class="sidebar__section-label">Main</span>
            <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span>Dashboard</span>
            </a>
          </div>

          <div class="sidebar__section">
            <span class="sidebar__section-label">Catalog</span>
            <a routerLink="/products" routerLinkActive="active" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <span>Products</span>
            </a>
            <a routerLink="/categories" routerLinkActive="active" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
              </svg>
              <span>Categories</span>
            </a>
            <a routerLink="/inventory" routerLinkActive="active" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
              </svg>
              <span>Inventory</span>
            </a>
          </div>

          <div class="sidebar__section">
            <span class="sidebar__section-label">Sales</span>
            <a routerLink="/orders" routerLinkActive="active" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span>Orders</span>
            </a>
            <a routerLink="/customers" routerLinkActive="active" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
              <span>Customers</span>
            </a>
            <a routerLink="/coupons" routerLinkActive="active" class="sidebar__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 5H3l9 7 9-7z"/><path d="M21 5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5"/>
              </svg>
              <span>Coupons</span>
            </a>
          </div>
        </nav>

        <!-- THEME SWITCHER -->
        <div class="sidebar__themes">
          <span class="sidebar__section-label">Theme</span>
          <div class="theme-switcher">
            @for (theme of themeService.themes(); track theme.name) {
              <button
                class="theme-dot"
                [class.theme-dot--active]="theme.name === themeService.currentTheme().name"
                [style.background]="theme.preview.sidebar"
                [style.box-shadow]="theme.name === themeService.currentTheme().name ? '0 0 0 2px ' + theme.preview.accent : 'none'"
                [title]="theme.displayName"
                (click)="themeService.setTheme(theme.name)">
                <span class="theme-dot__accent" [style.background]="theme.preview.accent"></span>
              </button>
            }
          </div>
        </div>

        <div class="sidebar__footer">
          <button class="sidebar__logout" (click)="authService.logout()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="main">
        <!-- TOPBAR -->
        <header class="topbar">
          <div class="topbar__left">
            <button class="topbar__toggle" (click)="sidebarCollapsed.set(!sidebarCollapsed())">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="topbar__right">
            <button class="topbar__icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span class="topbar__notification">3</span>
            </button>

            <div class="topbar__user">
              <div class="topbar__avatar">
                {{ userInitials }}
              </div>
              <div class="topbar__user-info">
                <span class="topbar__user-name">{{ authService.user()?.firstName }} {{ authService.user()?.lastName }}</span>
                <span class="topbar__user-role">{{ authService.user()?.role }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- PAGE CONTENT -->
        <div class="content">
          <router-outlet></router-outlet>
        </div>

        <!-- FOOTER -->
        <footer class="footer">
          <span>&copy; 2026 LuxePouch Admin. All rights reserved.</span>
          <span>v1.0.0</span>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      min-height: 100vh;
      transition: grid-template-columns 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .layout--collapsed {
      grid-template-columns: 72px 1fr;
      .sidebar__brand { font-size: 1rem; }
      .sidebar__badge, .sidebar__section-label, .sidebar__link span, .sidebar__logout span,
      .sidebar__themes { display: none; }
      .sidebar__header { justify-content: center; }
      .sidebar__link { justify-content: center; padding: 0.75rem; }
      .sidebar__logout { justify-content: center; }
    }

    /* SIDEBAR */
    .sidebar {
      background: var(--sidebar-bg);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      transition: background 0.3s;
    }

    .sidebar__header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem 1.25rem;
      border-bottom: 1px solid var(--sidebar-border);
    }

    .sidebar__brand {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--sidebar-brand);
      letter-spacing: 0.08em;
    }

    .sidebar__badge {
      font-size: 0.6rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.2rem 0.5rem;
      background: var(--accent-light);
      color: var(--sidebar-brand);
      border-radius: 4px;
    }

    .sidebar__nav {
      flex: 1;
      padding: 1rem 0.75rem;
    }

    .sidebar__section {
      margin-bottom: 1.5rem;
    }

    .sidebar__section-label {
      display: block;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--sidebar-text-muted);
      padding: 0 0.75rem;
      margin-bottom: 0.5rem;
    }

    .sidebar__link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border-radius: var(--radius-md);
      color: var(--sidebar-text);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        color: #fff;
        background: var(--sidebar-hover-bg);
      }

      &.active {
        color: var(--sidebar-active-text);
        background: var(--sidebar-active-bg);
      }
    }

    /* THEME SWITCHER */
    .sidebar__themes {
      padding: 0.75rem;
      border-top: 1px solid var(--sidebar-border);
    }

    .theme-switcher {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
    }

    .theme-dot {
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover { transform: scale(1.15); }
    }

    .theme-dot--active {
      border-color: transparent;
    }

    .theme-dot__accent {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .sidebar__footer {
      padding: 1rem 0.75rem;
      border-top: 1px solid var(--sidebar-border);
    }

    .sidebar__logout {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.65rem 0.75rem;
      border: none;
      border-radius: var(--radius-md);
      background: none;
      color: var(--sidebar-text);
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: var(--error);
        background: var(--error-bg);
      }
    }

    /* MAIN */
    .main {
      display: flex;
      flex-direction: column;
      background: var(--content-bg);
      min-height: 100vh;
      transition: background 0.3s;
    }

    /* TOPBAR */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.5rem;
      background: var(--topbar-bg);
      border-bottom: 1px solid var(--topbar-border);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: background 0.3s, border-color 0.3s;
    }

    .topbar__left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .topbar__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: var(--radius-md);
      background: var(--content-bg);
      color: var(--topbar-icon);
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: var(--border); }
    }

    .topbar__right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .topbar__icon-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: var(--radius-md);
      background: transparent;
      color: var(--topbar-icon);
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: var(--content-bg); }
    }

    .topbar__notification {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      background: var(--error);
      color: #fff;
      border-radius: 50%;
      font-size: 0.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .topbar__user {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.4rem 0.6rem;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: var(--content-bg); }
    }

    .topbar__avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--avatar-bg);
      color: var(--avatar-text);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .topbar__user-info {
      display: flex;
      flex-direction: column;
    }

    .topbar__user-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .topbar__user-role {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: capitalize;
    }

    /* CONTENT */
    .content {
      flex: 1;
      padding: 1.5rem;
    }

    /* FOOTER */
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      font-size: 0.75rem;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      background: var(--topbar-bg);
      transition: background 0.3s, border-color 0.3s;
    }
  `]
})
export class LayoutComponent {
  readonly authService = inject(AuthService);
  readonly themeService = inject(AdminThemeService);
  readonly sidebarCollapsed = signal(false);

  get userInitials(): string {
    const user = this.authService.user();
    if (!user) return 'A';
    return (user.firstName?.[0] || '') + (user.lastName?.[0] || '');
  }
}

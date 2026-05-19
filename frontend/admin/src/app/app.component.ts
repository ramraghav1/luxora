import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>BagStore Admin</h2>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active">
            <i class="pi pi-home"></i> Dashboard
          </a>
          <a routerLink="/products" routerLinkActive="active">
            <i class="pi pi-box"></i> Products
          </a>
          <a routerLink="/categories" routerLinkActive="active">
            <i class="pi pi-tags"></i> Categories
          </a>
          <a routerLink="/orders" routerLinkActive="active">
            <i class="pi pi-shopping-cart"></i> Orders
          </a>
          <a routerLink="/inventory" routerLinkActive="active">
            <i class="pi pi-warehouse"></i> Inventory
          </a>
          <a routerLink="/coupons" routerLinkActive="active">
            <i class="pi pi-ticket"></i> Coupons
          </a>
          <a routerLink="/customers" routerLinkActive="active">
            <i class="pi pi-users"></i> Customers
          </a>
        </nav>
      </aside>

      <div class="main-content">
        <header class="topbar">
          <div class="topbar-left">
            <button class="menu-toggle" (click)="sidebarOpen = !sidebarOpen">☰</button>
          </div>
          <div class="topbar-right">
            <span>Admin User</span>
          </div>
        </header>

        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; }
    .sidebar { width: 260px; background: #1e293b; color: #fff; flex-shrink: 0; }
    .sidebar-header { padding: 1.5rem; border-bottom: 1px solid #334155; }
    .sidebar-header h2 { margin: 0; font-size: 1.25rem; }
    .sidebar-nav { padding: 1rem 0; }
    .sidebar-nav a { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.5rem; color: #94a3b8; text-decoration: none; transition: all 0.2s; }
    .sidebar-nav a:hover { background: #334155; color: #fff; }
    .sidebar-nav a.active { background: #2563eb; color: #fff; }
    .main-content { flex: 1; background: #f1f5f9; }
    .topbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #fff; border-bottom: 1px solid #e2e8f0; }
    .menu-toggle { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
    .page-content { padding: 2rem; }
  `]
})
export class AppComponent {
  sidebarOpen = true;
}

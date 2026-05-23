import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // Auth routes (guest only)
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'forgot-password', loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // Protected routes (authenticated, wrapped in layout)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'products', loadComponent: () => import('./features/products/product-list.component').then(m => m.ProductListComponent) },
      { path: 'products/new', loadComponent: () => import('./features/products/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'products/:id/edit', loadComponent: () => import('./features/products/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'categories', loadComponent: () => import('./features/categories/category-management.component').then(m => m.CategoryManagementComponent) },
      { path: 'orders', loadComponent: () => import('./features/orders/order-management.component').then(m => m.OrderManagementComponent) },
      { path: 'inventory', loadComponent: () => import('./features/inventory/inventory-management.component').then(m => m.InventoryManagementComponent) },
      { path: 'coupons', loadComponent: () => import('./features/coupons/coupon-management.component').then(m => m.CouponManagementComponent) },
      { path: 'customers', loadComponent: () => import('./features/customers/customer-list.component').then(m => m.CustomerListComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'auth/login' }
];

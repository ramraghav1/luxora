import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-management.component').then(m => m.ProductManagementComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/category-management.component').then(m => m.CategoryManagementComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/order-management.component').then(m => m.OrderManagementComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./features/inventory/inventory-management.component').then(m => m.InventoryManagementComponent)
  },
  {
    path: 'coupons',
    loadComponent: () => import('./features/coupons/coupon-management.component').then(m => m.CouponManagementComponent)
  },
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customer-list.component').then(m => m.CustomerListComponent)
  }
];

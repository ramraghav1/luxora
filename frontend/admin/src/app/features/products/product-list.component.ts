import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService, ProductDto, ProductStatus } from './product.service';
import { ResolveImageUrlPipe } from '../../core/pipes/resolve-image-url.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ResolveImageUrlPipe],
  template: `
    <div class="products">
      <div class="products__header">
        <div>
          <h1 class="products__title">Products</h1>
          <p class="products__subtitle">{{ totalCount() }} products in your catalog</p>
        </div>
        <div class="products__actions">
          <button class="btn btn--outline btn--sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
          <button class="btn btn--primary btn--sm" (click)="goToCreate()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Product
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card__header">
          <div class="toolbar">
            <div class="toolbar__search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search products..." [ngModel]="searchTerm()" (ngModelChange)="onSearch($event)">
            </div>
            <select class="toolbar__filter" [ngModel]="statusFilter()" (ngModelChange)="onStatusFilter($event)">
              <option value="">All Statuses</option>
              <option value="0">Draft</option>
              <option value="1">Active</option>
              <option value="2">On Sale</option>
              <option value="3">Out of Stock</option>
              <option value="4">Discontinued</option>
            </select>
          </div>
        </div>
        @if (selectedIds().size > 0) {
          <div class="bulk-bar">
            <span class="bulk-bar__count">{{ selectedIds().size }} selected</span>
            <select class="toolbar__filter" (change)="bulkStatusChange($any($event.target).value); $any($event.target).value = ''">
              <option value="" disabled selected>Set status to...</option>
              <option value="0">Draft</option>
              <option value="1">Active</option>
              <option value="2">On Sale</option>
              <option value="3">Out of Stock</option>
              <option value="4">Discontinued</option>
            </select>
            <button class="btn btn--outline btn--xs" (click)="clearSelection()">Clear</button>
            <button class="btn btn--danger btn--xs" [disabled]="bulkActionInProgress()" (click)="bulkDelete()">
              @if (bulkActionInProgress()) { Working... } @else { Delete selected }
            </button>
          </div>
        }
        <div class="card__body">
          <table class="table">
            <thead>
              <tr>
                <th class="table__th--check">
                  <input type="checkbox" [checked]="allSelected()" (change)="toggleSelectAll()">
                </th>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Status</th>
                <th>Category</th>
                <th class="table__th--right">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (product of products(); track product.id) {
                <tr class="table__row" [class.table__row--selected]="isSelected(product.id)">
                  <td>
                    <input type="checkbox" [checked]="isSelected(product.id)" (change)="toggleSelect(product.id)">
                  </td>
                  <td>
                    <div class="product-info">
                      <img class="product-info__thumb" [src]="(product.mainImageUrl | resolveImageUrl) || 'https://placehold.co/40x40/f8f9fa/adb5bd?text=N'" alt="">
                      <div>
                        <span class="product-info__name">{{ product.name }}</span>
                        @if (product.brand) {
                          <span class="product-info__brand">{{ product.brand }}</span>
                        }
                      </div>
                    </div>
                  </td>
                  <td class="table__mono">{{ product.sku }}</td>
                  <td>
                    <span class="table__amount">\${{ product.price.toFixed(2) }}</span>
                    @if (product.salePrice) {
                      <span class="table__sale">\${{ product.salePrice.toFixed(2) }}</span>
                    }
                  </td>
                  <td>
                    <span class="status-badge" [ngClass]="'status-badge--' + getStatusClass(product.status)">
                      {{ getStatusLabel(product.status) }}
                    </span>
                  </td>
                  <td class="table__muted">{{ product.categoryName }}</td>
                  <td>
                    <div class="table__actions">
                      <select class="quick-status" [ngModel]="product.status" (ngModelChange)="quickStatusChange(product, $event)">
                        <option [value]="0">Draft</option>
                        <option [value]="1">Active</option>
                        <option [value]="2">On Sale</option>
                        <option [value]="3">Out of Stock</option>
                        <option [value]="4">Discontinued</option>
                      </select>
                      <button class="icon-btn" title="Duplicate" (click)="duplicateProduct(product)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                      </button>
                      <button class="icon-btn" title="Edit" (click)="goToEdit(product)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="icon-btn icon-btn--danger" title="Delete" (click)="deleteProduct(product)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2 2 0 01-2,2H7a2 2 0 01-2-2V6m3,0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="7" class="table__empty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                    <span>No products found</span>
                    <button class="btn btn--primary btn--xs" (click)="goToCreate()">Create your first product</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      @if (totalPages() > 1) {
        <div class="pagination">
          <button class="btn btn--outline btn--xs" [disabled]="currentPage() === 1" (click)="goToPage(currentPage() - 1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            Previous
          </button>
          <span class="pagination__info">Page {{ currentPage() }} of {{ totalPages() }}</span>
          <button class="btn btn--outline btn--xs" [disabled]="currentPage() === totalPages()" (click)="goToPage(currentPage() + 1)">
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .products__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }
    .products__title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
    .products__subtitle { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem; }
    .products__actions { display: flex; gap: 0.5rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.6rem 1.2rem; border: none; border-radius: var(--radius-sm);
      font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;
    }
    .btn--primary { background: var(--sidebar-bg); color: #fff; &:hover { opacity: 0.9; } }
    .btn--outline {
      background: var(--surface); color: var(--text-secondary); border: 1.5px solid var(--border);
      &:hover { border-color: var(--accent); color: var(--accent); }
      &:disabled { opacity: 0.4; cursor: not-allowed; }
    }
    .btn--sm { padding: 0.5rem 1rem; font-size: 0.78rem; }
    .btn--xs { padding: 0.35rem 0.75rem; font-size: 0.75rem; }
    .btn--danger {
      background: var(--error, #ef4444); color: #fff;
      &:hover { opacity: 0.9; }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .bulk-bar {
      display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1.25rem;
      background: color-mix(in srgb, var(--accent) 8%, transparent);
      border-bottom: 1px solid var(--border-light);
    }
    .bulk-bar__count { font-size: 0.78rem; font-weight: 600; color: var(--text-primary); margin-right: 0.25rem; }

    .icon-btn {
      width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center;
      border: none; background: transparent; border-radius: var(--radius-sm);
      color: var(--text-muted); cursor: pointer; transition: all 0.15s;
      &:hover { background: var(--content-bg); color: var(--text-primary); }
    }
    .icon-btn--danger:hover { background: var(--error-bg, #fef2f2); color: var(--error, #ef4444); }

    .card {
      background: var(--surface); border-radius: var(--radius-lg);
      border: 1px solid var(--border); overflow: hidden; transition: background 0.3s, border-color 0.3s;
    }
    .card__header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-light);
    }
    .card__body { padding: 0; }

    .toolbar { display: flex; gap: 0.75rem; align-items: center; width: 100%; }
    .toolbar__search {
      flex: 1; display: flex; align-items: center; gap: 0.5rem;
      background: var(--content-bg); border: 1.5px solid var(--border);
      border-radius: var(--radius-sm); padding: 0 0.75rem; transition: border-color 0.2s;
      &:focus-within { border-color: var(--accent); }
      svg { color: var(--text-muted); flex-shrink: 0; }
      input {
        flex: 1; border: none; background: transparent; outline: none;
        font-size: 0.82rem; color: var(--text-primary); padding: 0.5rem 0;
        &::placeholder { color: var(--text-muted); }
      }
    }
    .toolbar__filter {
      padding: 0.5rem 0.75rem; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
      background: var(--surface); color: var(--text-secondary); font-size: 0.78rem; font-weight: 500;
      outline: none; cursor: pointer;
      &:focus { border-color: var(--accent); }
    }

    .table { width: 100%; border-collapse: collapse; }
    .table th {
      text-align: left; padding: 0.7rem 1.25rem; font-size: 0.72rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); background: var(--content-bg);
    }
    .table__th--right { text-align: right; }
    .table__th--check { width: 36px; }
    .table td {
      padding: 0.75rem 1.25rem; font-size: 0.82rem; color: var(--text-secondary);
      border-top: 1px solid var(--border-light); vertical-align: middle;
    }
    .table__row { transition: background 0.15s; &:hover { background: var(--content-bg); } }
    .table__row--selected { background: color-mix(in srgb, var(--accent) 6%, transparent); }

    .product-info { display: flex; align-items: center; gap: 0.75rem; }
    .product-info__thumb {
      width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;
      border: 1px solid var(--border-light);
    }
    .product-info__name { display: block; font-weight: 600; color: var(--text-primary); font-size: 0.82rem; }
    .product-info__brand { display: block; font-size: 0.7rem; color: var(--text-muted); }

    .table__mono { font-family: 'SF Mono', monospace; font-size: 0.75rem; color: var(--text-muted); }
    .table__amount { font-weight: 600; color: var(--text-primary); }
    .table__sale { font-size: 0.72rem; color: var(--error, #ef4444); margin-left: 0.4rem; text-decoration: line-through; }
    .table__muted { color: var(--text-muted); }
    .table__actions { display: flex; align-items: center; justify-content: flex-end; gap: 0.25rem; }

    .quick-status {
      padding: 0.3rem 0.5rem; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
      background: var(--surface); color: var(--text-secondary); font-size: 0.7rem; font-weight: 500;
      outline: none; cursor: pointer;
    }

    .status-badge {
      display: inline-flex; padding: 0.25rem 0.6rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600;
    }
    .status-badge--draft { background: var(--content-bg); color: var(--text-muted); }
    .status-badge--active { background: var(--success-bg, #d1fae5); color: var(--success, #059669); }
    .status-badge--sale { background: var(--warning-bg, #fef3c7); color: var(--warning, #d97706); }
    .status-badge--outofstock { background: var(--error-bg, #fef2f2); color: var(--error, #ef4444); }
    .status-badge--discontinued { background: var(--content-bg); color: var(--text-muted); }

    .table__empty {
      text-align: center; padding: 3rem 1.25rem !important; color: var(--text-muted);
      display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
      span { font-size: 0.85rem; font-weight: 500; }
    }

    .pagination {
      display: flex; justify-content: center; align-items: center; gap: 0.75rem; margin-top: 1.25rem;
    }
    .pagination__info { font-size: 0.78rem; color: var(--text-muted); font-weight: 500; }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private searchDebounceTimer?: ReturnType<typeof setTimeout>;

  products = signal<ProductDto[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  totalPages = signal(1);
  searchTerm = signal('');
  statusFilter = signal<string>('');
  selectedIds = signal<Set<string>>(new Set());
  bulkActionInProgress = signal(false);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    const params: any = { page: this.currentPage(), pageSize: 20 };
    if (this.searchTerm()) params.search = this.searchTerm();
    if (this.statusFilter()) params.status = parseInt(this.statusFilter());

    this.productService.getProducts(params).subscribe({
      next: (res) => {
        this.products.set(res.data.items);
        this.totalCount.set(res.data.totalCount);
        this.totalPages.set(res.data.totalPages);
        this.selectedIds.set(new Set());
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.currentPage.set(1);
      this.loadProducts();
    }, 300);
  }

  onStatusFilter(status: string) {
    this.statusFilter.set(status);
    this.currentPage.set(1);
    this.loadProducts();
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.loadProducts();
  }

  goToCreate() {
    this.router.navigate(['/products', 'new']);
  }

  goToEdit(product: ProductDto) {
    this.router.navigate(['/products', product.id, 'edit']);
  }

  duplicateProduct(product: ProductDto) {
    this.router.navigate(['/products', 'new'], { queryParams: { duplicateFrom: product.id } });
  }

  deleteProduct(product: ProductDto) {
    if (!confirm(`Delete "${product.name}"? This action cannot be undone.`)) return;
    this.productService.deleteProduct(product.id).subscribe({
      next: () => this.loadProducts()
    });
  }

  quickStatusChange(product: ProductDto, status: string) {
    this.productService.updateStatus(product.id, { status: parseInt(status) as ProductStatus }).subscribe({
      next: () => this.loadProducts()
    });
  }

  // Selection & bulk actions
  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  allSelected(): boolean {
    return this.products().length > 0 && this.products().every(p => this.selectedIds().has(p.id));
  }

  toggleSelect(id: string) {
    const next = new Set(this.selectedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.selectedIds.set(next);
  }

  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.products().map(p => p.id)));
    }
  }

  clearSelection() {
    this.selectedIds.set(new Set());
  }

  bulkDelete() {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected product${ids.length > 1 ? 's' : ''}? This action cannot be undone.`)) return;

    this.bulkActionInProgress.set(true);
    forkJoin(ids.map(id => this.productService.deleteProduct(id))).subscribe({
      next: () => {
        this.bulkActionInProgress.set(false);
        this.loadProducts();
      },
      error: () => {
        this.bulkActionInProgress.set(false);
        this.loadProducts();
      }
    });
  }

  bulkStatusChange(statusValue: string) {
    const ids = Array.from(this.selectedIds());
    if (!statusValue || ids.length === 0) return;
    const status = parseInt(statusValue) as ProductStatus;

    this.bulkActionInProgress.set(true);
    forkJoin(ids.map(id => this.productService.updateStatus(id, { status }))).subscribe({
      next: () => {
        this.bulkActionInProgress.set(false);
        this.loadProducts();
      },
      error: () => {
        this.bulkActionInProgress.set(false);
        this.loadProducts();
      }
    });
  }

  getStatusLabel(status: ProductStatus): string {
    return ['Draft', 'Active', 'On Sale', 'Out of Stock', 'Discontinued'][status] || 'Unknown';
  }

  getStatusClass(status: ProductStatus): string {
    return ['draft', 'active', 'sale', 'outofstock', 'discontinued'][status] || 'draft';
  }
}

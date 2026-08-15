import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { Product, ProductQueryParams, Category } from '@core/models/product.model';
import { PagedResult } from '@core/models/api-response.model';
import { ResolveImageUrlPipe } from '@shared/pipes/resolve-image-url.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ResolveImageUrlPipe],
  template: `
    <div class="product-list-page">
      <!-- Header -->
      <section class="page-header">
        <div class="container">
          <h1>{{ selectedCategory?.name || 'All Products' }}</h1>
          <p *ngIf="selectedCategory?.description">{{ selectedCategory?.description }}</p>
          <p class="result-count" *ngIf="pagedResult">
            Showing {{ pagedResult.items.length }} of {{ pagedResult.totalCount }} products
          </p>
        </div>
      </section>

      <div class="container product-layout">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <div class="filter-section">
            <h3>Categories</h3>
            <ul class="category-list">
              <li>
                <a [routerLink]="['/products']"
                   [class.active]="!queryParams.categoryId"
                   (click)="filterByCategory(undefined)">
                  All Categories
                </a>
              </li>
              <li *ngFor="let cat of categories">
                <a [routerLink]="['/products']"
                   [queryParams]="{category: cat.id}"
                   [class.active]="queryParams.categoryId === cat.id"
                   (click)="filterByCategory(cat.id)">
                  {{ cat.name }}
                  <span class="count">({{ cat.productCount }})</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-inputs">
              <input type="number" placeholder="Min" [(ngModel)]="queryParams.minPrice"
                     (ngModelChange)="onFilterChange()" min="0">
              <span>-</span>
              <input type="number" placeholder="Max" [(ngModel)]="queryParams.maxPrice"
                     (ngModelChange)="onFilterChange()" min="0">
            </div>
          </div>

          <div class="filter-section">
            <h3>Sort By</h3>
            <select [(ngModel)]="sortOption" (ngModelChange)="onSortChange($event)">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </aside>

        <!-- Product Grid -->
        <main class="product-grid-container">
          <!-- Search Bar -->
          <div class="search-bar">
            <input type="text"
                   placeholder="Search products..."
                   [(ngModel)]="searchTerm"
                   (ngModelChange)="onSearchChange($event)">
          </div>

          <!-- Loading State -->
          <div *ngIf="loading" class="loading-spinner">
            <p>Loading products...</p>
          </div>

          <!-- Product Grid -->
          <div *ngIf="!loading" class="product-grid">
            <div *ngFor="let product of products" class="product-card">
              <a [routerLink]="['/products', product.slug]" class="product-link">
                <div class="product-image">
                  <img [src]="(product.mainImageUrl | resolveImageUrl) || 'assets/images/placeholder.png'"
                       [alt]="product.name"
                       loading="lazy">
                  <span *ngIf="product.compareAtPrice" class="sale-badge">Sale</span>
                  <span *ngIf="product.isFeatured" class="featured-badge">Featured</span>
                </div>
                <div class="product-info">
                  <p class="product-category">{{ product.categoryName }}</p>
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-description">{{ product.shortDescription }}</p>
                  <div class="product-pricing">
                    <span class="current-price">\${{ product.price.toFixed(2) }}</span>
                    <span *ngIf="product.compareAtPrice" class="original-price">
                      \${{ product.compareAtPrice.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="!loading && products.length === 0" class="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>

          <!-- Pagination -->
          <div *ngIf="pagedResult && pagedResult.totalPages > 1" class="pagination">
            <button
              (click)="goToPage(queryParams.page! - 1)"
              [disabled]="!pagedResult.hasPreviousPage">
              Previous
            </button>
            <span class="page-info">
              Page {{ queryParams.page }} of {{ pagedResult.totalPages }}
            </span>
            <button
              (click)="goToPage(queryParams.page! + 1)"
              [disabled]="!pagedResult.hasNextPage">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }

    .page-header {
      background: var(--gradient-hero);
      padding: 3rem 0;
      margin-bottom: 2.5rem;
      color: var(--color-text-inverse);
    }
    .page-header h1 { margin: 0 0 0.5rem; font-size: 2.2rem; font-family: var(--font-display); }
    .result-count { color: rgba(255,255,255,0.75); font-size: 0.9rem; }

    .product-layout { display: grid; grid-template-columns: 260px 1fr; gap: 2.5rem; padding-bottom: 3rem; }

    .filters-sidebar {
      position: sticky;
      top: 6rem;
      align-self: start;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-border-light);
    }
    .filter-section { margin-bottom: 1.5rem; }
    .filter-section h3 {
      font-size: 0.88rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 0.75rem;
      color: var(--color-text);
      border-bottom: 1px solid var(--color-border-light);
      padding-bottom: 0.5rem;
    }
    .category-list { list-style: none; padding: 0; }
    .category-list li a {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0.5rem;
      color: var(--color-text-secondary);
      text-decoration: none;
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);
    }
    .category-list li a:hover { background: var(--color-bg-secondary); color: var(--color-primary); }
    .category-list li a.active { color: var(--color-primary); font-weight: 600; background: var(--color-primary-50); }
    .count { color: var(--color-text-muted); font-size: 0.82rem; }
    .price-inputs { display: flex; align-items: center; gap: 0.5rem; }
    .price-inputs input {
      width: 80px;
      padding: 0.5rem 0.6rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 0.85rem;
      outline: none;
      transition: border-color var(--transition-fast);
    }
    .price-inputs input:focus { border-color: var(--color-primary); }
    .filter-section select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-bg);
      color: var(--color-text);
      outline: none;
    }

    .search-bar { margin-bottom: 1.5rem; }
    .search-bar input {
      width: 100%;
      padding: 0.9rem 1.2rem;
      border: 2px solid var(--color-border-light);
      border-radius: var(--radius-full);
      font-size: 0.95rem;
      background: var(--color-surface);
      color: var(--color-text);
      outline: none;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }
    .search-bar input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-100);
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--transition-normal);
      background: var(--color-surface);
    }
    .product-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
      border-color: var(--color-primary-200);
    }
    .product-link { text-decoration: none; color: inherit; display: block; }
    .product-image { position: relative; aspect-ratio: 1; overflow: hidden; background: var(--color-bg-tertiary); }
    .product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow); }
    .product-card:hover .product-image img { transform: scale(1.05); }
    .sale-badge, .featured-badge {
      position: absolute;
      top: 0.75rem;
      padding: 0.3rem 0.8rem;
      border-radius: var(--radius-full);
      font-size: 0.72rem;
      font-weight: 700;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .sale-badge { left: 0.75rem; background: var(--color-badge-sale); }
    .featured-badge { right: 0.75rem; background: var(--color-badge-premium); }
    .product-info { padding: 1.2rem; }
    .product-category {
      font-size: 0.75rem;
      color: var(--color-primary);
      margin: 0 0 0.3rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 500;
    }
    .product-name {
      font-size: 1rem;
      margin: 0 0 0.4rem;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.3;
    }
    .product-description {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      margin: 0 0 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
    .product-pricing { display: flex; align-items: center; gap: 0.6rem; }
    .current-price { font-size: 1.1rem; font-weight: 700; color: var(--color-primary-dark); }
    .original-price { font-size: 0.88rem; color: var(--color-text-muted); text-decoration: line-through; }

    .loading-spinner { text-align: center; padding: 3rem; color: var(--color-text-muted); }
    .empty-state { text-align: center; padding: 4rem 2rem; color: var(--color-text-muted); }
    .empty-state h3 { color: var(--color-text-secondary); margin-bottom: 0.5rem; }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2.5rem;
      padding: 1rem 0;
    }
    .pagination button {
      padding: 0.6rem 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      background: var(--color-surface);
      cursor: pointer;
      font-weight: 500;
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);
    }
    .pagination button:hover:not(:disabled) {
      background: var(--color-primary);
      color: var(--color-text-inverse);
      border-color: var(--color-primary);
    }
    .pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
    .page-info { font-size: 0.9rem; color: var(--color-text-muted); }

    @media (max-width: 768px) {
      .product-layout { grid-template-columns: 1fr; }
      .filters-sidebar { position: static; }
    }
  `]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory?: Category;
  pagedResult?: PagedResult<Product>;
  loading = true;
  searchTerm = '';
  sortOption = 'newest';

  queryParams: ProductQueryParams = {
    page: 1,
    pageSize: 20,
    isActive: true
  };

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => this.categories = categories);

    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.queryParams.search = term || undefined;
      this.queryParams.page = 1;
      this.loadProducts();
    });

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['category']) {
        this.queryParams.categoryId = params['category'];
      }
      this.loadProducts();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.queryParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.pagedResult = result;
          this.products = result.items;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  filterByCategory(categoryId: string | undefined): void {
    this.queryParams.categoryId = categoryId;
    this.queryParams.page = 1;
    this.selectedCategory = this.categories.find(c => c.id === categoryId);
    this.loadProducts();
  }

  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  onFilterChange(): void {
    this.queryParams.page = 1;
    this.loadProducts();
  }

  onSortChange(option: string): void {
    switch (option) {
      case 'newest':
        this.queryParams.sortBy = 'CreatedAt';
        this.queryParams.sortDirection = 'desc';
        break;
      case 'price-asc':
        this.queryParams.sortBy = 'Price';
        this.queryParams.sortDirection = 'asc';
        break;
      case 'price-desc':
        this.queryParams.sortBy = 'Price';
        this.queryParams.sortDirection = 'desc';
        break;
      case 'name-asc':
        this.queryParams.sortBy = 'Name';
        this.queryParams.sortDirection = 'asc';
        break;
      case 'name-desc':
        this.queryParams.sortBy = 'Name';
        this.queryParams.sortDirection = 'desc';
        break;
    }
    this.queryParams.page = 1;
    this.loadProducts();
  }

  goToPage(page: number): void {
    this.queryParams.page = page;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

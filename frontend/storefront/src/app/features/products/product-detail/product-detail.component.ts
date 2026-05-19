import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { ProductService } from '@core/services/product.service';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-detail" *ngIf="product">
      <div class="container">
        <nav class="breadcrumb">
          <a routerLink="/">Home</a> /
          <a routerLink="/products">Products</a> /
          <a [routerLink]="['/products']" [queryParams]="{category: product.categoryId}">
            {{ product.categoryName }}
          </a> /
          <span>{{ product.name }}</span>
        </nav>

        <div class="product-layout">
          <div class="product-gallery">
            <div class="main-image">
              <img [src]="selectedImage || product.mainImageUrl || 'assets/images/placeholder.png'"
                   [alt]="product.name">
            </div>
            <div class="thumbnail-list" *ngIf="product.images.length > 0">
              <img *ngFor="let img of product.images"
                   [src]="img.url"
                   [alt]="img.altText || product.name"
                   [class.active]="selectedImage === img.url"
                   (click)="selectedImage = img.url"
                   loading="lazy">
            </div>
          </div>

          <div class="product-info">
            <p class="category">{{ product.categoryName }}</p>
            <h1>{{ product.name }}</h1>
            <p class="sku">SKU: {{ product.sku }}</p>

            <div class="pricing">
              <span class="price">\${{ product.price.toFixed(2) }}</span>
              <span *ngIf="product.compareAtPrice" class="compare-price">
                \${{ product.compareAtPrice.toFixed(2) }}
              </span>
              <span *ngIf="product.compareAtPrice" class="discount">
                Save \${{ (product.compareAtPrice - product.price).toFixed(2) }}
              </span>
            </div>

            <p class="short-desc">{{ product.shortDescription }}</p>

            <div class="actions">
              <div class="quantity-selector">
                <button (click)="quantity > 1 && quantity = quantity - 1">-</button>
                <span>{{ quantity }}</span>
                <button (click)="quantity = quantity + 1">+</button>
              </div>
              <button class="add-to-cart-btn">Add to Cart</button>
            </div>

            <div class="attributes" *ngIf="product.attributes.length > 0">
              <h3>Specifications</h3>
              <table>
                <tr *ngFor="let attr of product.attributes">
                  <td class="attr-name">{{ attr.name }}</td>
                  <td>{{ attr.value }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div class="description-section">
          <h2>Description</h2>
          <div [innerHTML]="product.description"></div>
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="loading">
      <p>Loading product...</p>
    </div>
  `,
  styles: [`
    .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
    .breadcrumb {
      padding: 1.5rem 0;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
    .breadcrumb a {
      color: var(--color-primary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }
    .breadcrumb a:hover { color: var(--color-primary-dark); }

    .product-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5rem;
      margin: 2rem 0 4rem;
    }

    .main-image {
      aspect-ratio: 1;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--color-bg-tertiary);
      box-shadow: var(--shadow-md);
    }
    .main-image img { width: 100%; height: 100%; object-fit: cover; }

    .thumbnail-list { display: flex; gap: 0.75rem; margin-top: 1rem; }
    .thumbnail-list img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-md);
      border: 2px solid var(--color-border-light);
      cursor: pointer;
      transition: border-color var(--transition-fast);
    }
    .thumbnail-list img.active, .thumbnail-list img:hover {
      border-color: var(--color-primary);
    }

    .category {
      text-transform: uppercase;
      font-size: 0.78rem;
      letter-spacing: 0.06em;
      color: var(--color-primary);
      margin: 0;
      font-weight: 600;
    }
    h1 {
      font-family: var(--font-display);
      font-size: 2.2rem;
      margin: 0.5rem 0;
      color: var(--color-text);
    }
    .sku { color: var(--color-text-muted); font-size: 0.82rem; }

    .pricing {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
      padding: 1.2rem;
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
    }
    .price {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-primary-dark);
    }
    .compare-price {
      font-size: 1.2rem;
      color: var(--color-text-muted);
      text-decoration: line-through;
    }
    .discount {
      background: var(--color-badge-sale);
      color: #fff;
      padding: 0.3rem 0.8rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 600;
    }

    .short-desc {
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin: 1.2rem 0;
      font-size: 0.95rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin: 2rem 0;
    }
    .quantity-selector {
      display: flex;
      align-items: center;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-full);
      overflow: hidden;
    }
    .quantity-selector button {
      width: 44px;
      height: 44px;
      border: none;
      background: var(--color-bg-secondary);
      cursor: pointer;
      font-size: 1.2rem;
      color: var(--color-text);
      transition: background var(--transition-fast);
    }
    .quantity-selector button:hover { background: var(--color-primary-100); }
    .quantity-selector span {
      width: 50px;
      text-align: center;
      font-weight: 700;
      color: var(--color-text);
    }
    .add-to-cart-btn {
      flex: 1;
      padding: 0.9rem 2rem;
      background: var(--color-primary);
      color: var(--color-text-inverse);
      border: none;
      border-radius: var(--radius-full);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-sm);
    }
    .add-to-cart-btn:hover {
      background: var(--color-primary-dark);
      box-shadow: var(--shadow-md);
    }

    .attributes {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-border-light);
    }
    .attributes h3 {
      margin-bottom: 0.75rem;
      font-size: 1rem;
      color: var(--color-text);
    }
    .attributes table { width: 100%; border-collapse: collapse; }
    .attributes td {
      padding: 0.6rem 0.8rem;
      border-bottom: 1px solid var(--color-border-light);
      font-size: 0.88rem;
      color: var(--color-text-secondary);
    }
    .attr-name {
      font-weight: 600;
      color: var(--color-text);
      width: 40%;
    }

    .description-section {
      margin: 3rem 0 4rem;
      padding: 2.5rem;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-light);
    }
    .description-section h2 {
      font-family: var(--font-display);
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .loading {
      text-align: center;
      padding: 4rem;
      color: var(--color-text-muted);
    }

    @media (max-width: 768px) {
      .product-layout { grid-template-columns: 1fr; gap: 2rem; }
      h1 { font-size: 1.6rem; }
      .pricing { flex-wrap: wrap; }
    }
  `]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  loading = true;
  quantity = 1;
  selectedImage?: string;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.loading = true;
        return this.productService.getProductBySlug(params['slug']);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: product => {
        this.product = product;
        this.selectedImage = product.mainImageUrl || undefined;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

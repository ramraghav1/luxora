import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart.service';
import { ResolveImageUrlPipe } from '@shared/pipes/resolve-image-url.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ResolveImageUrlPipe],
  template: `
    <article class="product-card" [class.product-card--featured]="featured">
      <a [routerLink]="['/products', product.slug]" class="product-card__link">
        <div class="product-card__image-wrap">
          <img
            [src]="(product.mainImageUrl | resolveImageUrl) || 'https://placehold.co/400x500/e8f5e9/2d6a4f?text=' + product.name"
            [alt]="product.name"
            class="product-card__image"
            loading="lazy"
          />
          <div class="product-card__badges">
            @if (badge) {
              <span class="badge" [class]="'badge--' + badge">{{ badgeLabel }}</span>
            }
            @if (product.compareAtPrice && product.compareAtPrice > product.price) {
              <span class="badge badge--sale">
                -{{ discountPercentage }}%
              </span>
            }
          </div>
          <div class="product-card__overlay">
            <button class="product-card__quick-add" (click)="addToCart($event)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Quick Add
            </button>
          </div>
        </div>

        <div class="product-card__info">
          <span class="product-card__category">{{ product.categoryName }}</span>
          <h3 class="product-card__name">{{ product.name }}</h3>
          <p class="product-card__description">{{ product.shortDescription }}</p>
          <div class="product-card__pricing">
            <span class="product-card__price">{{ product.price | currency }}</span>
            @if (product.compareAtPrice && product.compareAtPrice > product.price) {
              <span class="product-card__original-price">{{ product.compareAtPrice | currency }}</span>
            }
          </div>
        </div>
      </a>
    </article>
  `,
  styles: [`
    .product-card {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: var(--color-surface);
      border: 1px solid var(--color-border-light);
      transition: all var(--transition-normal);

      &:hover {
        box-shadow: var(--shadow-lg);
        border-color: transparent;
        transform: translateY(-2px);

        .product-card__image {
          transform: scale(1.03);
        }
        .product-card__overlay {
          opacity: 1;
        }
      }
    }

    .product-card--featured {
      .product-card__image-wrap { aspect-ratio: 3/4; }
    }

    .product-card__link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .product-card__image-wrap {
      position: relative;
      aspect-ratio: 4/5;
      overflow: hidden;
      background: var(--color-bg-tertiary);
    }

    .product-card__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }

    .product-card__badges {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .badge {
      display: inline-flex;
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-full);
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: #fff;
    }

    .badge--new { background: var(--color-badge-new); }
    .badge--sale { background: var(--color-badge-sale); }
    .badge--premium { background: var(--color-badge-premium); }
    .badge--bestseller { background: var(--color-primary); }

    .product-card__overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
      opacity: 0;
      transition: opacity var(--transition-normal);
      display: flex;
      justify-content: center;
    }

    .product-card__quick-add {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.7rem 1.5rem;
      background: var(--color-surface);
      border: none;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 0.82rem;
      cursor: pointer;
      color: var(--color-primary);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-primary);
        color: var(--color-text-inverse);
      }
    }

    .product-card__info {
      padding: 1.25rem;
    }

    .product-card__category {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .product-card__name {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-text);
      margin: 0.4rem 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-card__description {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-card__pricing {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .product-card__price {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text);
    }

    .product-card__original-price {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      text-decoration: line-through;
    }
  `]
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);

  @Input({ required: true }) product!: Product;
  @Input() badge?: 'new' | 'sale' | 'premium' | 'bestseller';
  @Input() featured = false;

  get badgeLabel(): string {
    const labels: Record<string, string> = {
      new: 'New',
      sale: 'Sale',
      premium: 'Premium',
      bestseller: 'Bestseller'
    };
    return labels[this.badge ?? ''] ?? '';
  }

  get discountPercentage(): number {
    if (!this.product.compareAtPrice || this.product.compareAtPrice <= this.product.price) return 0;
    return Math.round((1 - this.product.price / this.product.compareAtPrice) * 100);
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      slug: this.product.slug,
      mainImageUrl: this.product.mainImageUrl,
      price: this.product.price
    });
  }
}

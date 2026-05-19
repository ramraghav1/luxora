import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { Product, Category } from '@core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero__bg"></div>
      <div class="container hero__content">
        <div class="hero__text">
          <span class="hero__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
            Sustainable Living
          </span>
          <h1 class="hero__title">
            Shop <span class="hero__highlight">Consciously</span>,
            Live Beautifully
          </h1>
          <p class="hero__subtitle">
            Discover our curated collection of eco-friendly products. Every purchase contributes to a greener planet.
          </p>
          <div class="hero__actions">
            <a routerLink="/products" class="btn btn--primary btn--lg">Shop Now</a>
            <a routerLink="/products" [queryParams]="{tag: 'new'}" class="btn btn--outline btn--lg">New Arrivals</a>
          </div>
          <div class="hero__stats">
            <div class="hero__stat">
              <span class="hero__stat-number">50K+</span>
              <span class="hero__stat-label">Happy Customers</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-number">100%</span>
              <span class="hero__stat-label">Eco-Certified</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-number">2M+</span>
              <span class="hero__stat-label">Trees Planted</span>
            </div>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__image-grid">
            <div class="hero__image-card hero__image-card--1">
              <img src="https://placehold.co/300x400/2d6a4f/ffffff?text=Eco+Products" alt="Eco Products" />
            </div>
            <div class="hero__image-card hero__image-card--2">
              <img src="https://placehold.co/300x350/40916c/ffffff?text=Sustainable" alt="Sustainable" />
            </div>
            <div class="hero__image-card hero__image-card--3">
              <img src="https://placehold.co/300x300/52b788/ffffff?text=Natural" alt="Natural" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES SECTION -->
    <section class="section categories-section">
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">Shop by Category</h2>
          <p class="section__subtitle">Find exactly what you're looking for</p>
        </div>
        <div class="categories-grid">
          @for (category of categories; track category.id) {
            <a [routerLink]="['/products']" [queryParams]="{categoryId: category.id}" class="category-card">
              <div class="category-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </div>
              <h3 class="category-card__name">{{ category.name }}</h3>
              <span class="category-card__count">{{ category.productCount }} products</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- NEW ARRIVALS SECTION -->
    <section class="section">
      <div class="container">
        <div class="section__header">
          <div>
            <h2 class="section__title">New Arrivals</h2>
            <p class="section__subtitle">Fresh picks just landed in store</p>
          </div>
          <a routerLink="/products" [queryParams]="{tag: 'new'}" class="section__view-all">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
        <div class="products-grid">
          @for (product of newArrivals; track product.id) {
            <app-product-card [product]="product" badge="new" />
          }
        </div>
      </div>
    </section>

    <!-- PROMO BANNER -->
    <section class="promo-banner">
      <div class="container promo-banner__content">
        <div class="promo-banner__text">
          <span class="promo-banner__label">Limited Time Offer</span>
          <h2 class="promo-banner__title">Get 20% Off Your First Order</h2>
          <p class="promo-banner__desc">Join our eco-community and enjoy exclusive member benefits.</p>
          <a routerLink="/auth/register" class="btn btn--accent btn--lg">Join Now & Save</a>
        </div>
        <div class="promo-banner__visual">
          <div class="promo-banner__circle">
            <span class="promo-banner__percent">20%</span>
            <span class="promo-banner__off">OFF</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ON SALE SECTION -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header">
          <div>
            <h2 class="section__title">On Sale</h2>
            <p class="section__subtitle">Great deals on sustainable products</p>
          </div>
          <a routerLink="/products" [queryParams]="{tag: 'sale'}" class="section__view-all">
            View All Sales
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
        <div class="products-grid">
          @for (product of saleProducts; track product.id) {
            <app-product-card [product]="product" badge="sale" />
          }
        </div>
      </div>
    </section>

    <!-- PREMIUM COLLECTION -->
    <section class="section">
      <div class="container">
        <div class="section__header section__header--center">
          <span class="section__eyebrow">Exclusive</span>
          <h2 class="section__title">Premium Collection</h2>
          <p class="section__subtitle">Handcrafted luxury meets sustainability</p>
        </div>
        <div class="products-grid products-grid--featured">
          @for (product of premiumProducts; track product.id) {
            <app-product-card [product]="product" badge="premium" [featured]="true" />
          }
        </div>
        <div class="section__cta">
          <a routerLink="/products" [queryParams]="{tag: 'premium'}" class="btn btn--primary btn--lg">
            Explore Premium
          </a>
        </div>
      </div>
    </section>

    <!-- ECO IMPACT SECTION -->
    <section class="eco-section">
      <div class="container">
        <div class="eco-section__content">
          <div class="eco-section__text">
            <h2 class="eco-section__title">Our Eco Impact</h2>
            <p class="eco-section__desc">
              Every product in our store is carefully selected for its environmental impact.
              We partner with certified suppliers who share our vision of a sustainable future.
            </p>
            <div class="eco-section__features">
              <div class="eco-feature">
                <div class="eco-feature__icon">🌍</div>
                <div>
                  <h4>Carbon Neutral Shipping</h4>
                  <p>All deliveries offset 100% of carbon emissions</p>
                </div>
              </div>
              <div class="eco-feature">
                <div class="eco-feature__icon">📦</div>
                <div>
                  <h4>Plastic-Free Packaging</h4>
                  <p>Biodegradable materials only — zero plastic waste</p>
                </div>
              </div>
              <div class="eco-feature">
                <div class="eco-feature__icon">🌱</div>
                <div>
                  <h4>One Tree Per Order</h4>
                  <p>We plant a tree with every purchase you make</p>
                </div>
              </div>
            </div>
          </div>
          <div class="eco-section__visual">
            <div class="eco-circle eco-circle--lg">
              <div class="eco-circle eco-circle--md">
                <div class="eco-circle eco-circle--sm">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED / BESTSELLERS -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header">
          <div>
            <h2 class="section__title">Bestsellers</h2>
            <p class="section__subtitle">Most loved by our community</p>
          </div>
          <a routerLink="/products" class="section__view-all">
            Shop All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
        <div class="products-grid">
          @for (product of featuredProducts; track product.id) {
            <app-product-card [product]="product" badge="eco" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ===================== HERO ===================== */
    .hero {
      position: relative;
      padding: 5rem 0;
      overflow: hidden;
      min-height: 85vh;
      display: flex;
      align-items: center;
    }

    .hero__bg {
      position: absolute;
      inset: 0;
      background: var(--gradient-hero);
      opacity: 0.04;
      z-index: 0;
    }

    .hero__content {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero__badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      background: var(--color-primary-100);
      color: var(--color-primary);
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .hero__title {
      font-family: var(--font-display);
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: var(--color-text);
      margin-bottom: 1.5rem;
    }

    .hero__highlight {
      color: var(--color-primary);
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        right: 0;
        height: 8px;
        background: var(--color-primary-200);
        opacity: 0.5;
        border-radius: 4px;
        z-index: -1;
      }
    }

    .hero__subtitle {
      font-size: 1.15rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
      max-width: 480px;
    }

    .hero__actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .hero__stats {
      display: flex;
      gap: 2.5rem;
    }

    .hero__stat {
      display: flex;
      flex-direction: column;
    }

    .hero__stat-number {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-primary);
    }

    .hero__stat-label {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin-top: 0.2rem;
    }

    .hero__visual {
      display: flex;
      justify-content: center;
    }

    .hero__image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 1rem;
      max-width: 500px;
    }

    .hero__image-card {
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      img { width: 100%; height: 100%; object-fit: cover; }
    }

    .hero__image-card--1 {
      grid-row: 1 / 3;
      aspect-ratio: 3/4;
    }

    .hero__image-card--2 {
      aspect-ratio: 1/1.1;
    }

    .hero__image-card--3 {
      aspect-ratio: 1/1;
    }

    /* ===================== SECTIONS ===================== */
    .section {
      padding: 5rem 0;
    }

    .section--alt {
      background: var(--color-bg-secondary);
    }

    .section__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2.5rem;
    }

    .section__header--center {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .section__eyebrow {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-accent);
      margin-bottom: 0.5rem;
    }

    .section__title {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text);
    }

    .section__subtitle {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      margin-top: 0.3rem;
    }

    .section__view-all {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: gap var(--transition-fast);
      &:hover { gap: 0.7rem; }
    }

    .section__cta {
      text-align: center;
      margin-top: 3rem;
    }

    /* ===================== PRODUCT GRIDS ===================== */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .products-grid--featured {
      grid-template-columns: repeat(3, 1fr);
    }

    /* ===================== CATEGORIES ===================== */
    .categories-section {
      background: var(--color-bg-secondary);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1.2rem;
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem 1.2rem;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      text-decoration: none;
      border: 1px solid var(--color-border-light);
      transition: all var(--transition-normal);

      &:hover {
        border-color: var(--color-primary-300);
        box-shadow: var(--shadow-md);
        transform: translateY(-3px);
        .category-card__icon { background: var(--color-primary); color: #fff; }
      }
    }

    .category-card__icon {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-full);
      background: var(--color-primary-100);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      transition: all var(--transition-normal);
    }

    .category-card__name {
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.3rem;
    }

    .category-card__count {
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    /* ===================== PROMO BANNER ===================== */
    .promo-banner {
      background: var(--gradient-primary);
      padding: 4rem 0;
    }

    .promo-banner__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .promo-banner__label {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: rgba(255,255,255,0.15);
      border-radius: var(--radius-full);
      color: rgba(255,255,255,0.9);
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .promo-banner__title {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.8rem;
    }

    .promo-banner__desc {
      color: rgba(255,255,255,0.85);
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
      max-width: 480px;
    }

    .promo-banner__visual {
      display: flex;
      justify-content: center;
    }

    .promo-banner__circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: 2px dashed rgba(255,255,255,0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .promo-banner__percent {
      font-size: 3rem;
      font-weight: 800;
      color: #fff;
      line-height: 1;
    }

    .promo-banner__off {
      font-size: 1.2rem;
      font-weight: 700;
      color: rgba(255,255,255,0.8);
    }

    /* ===================== ECO SECTION ===================== */
    .eco-section {
      padding: 5rem 0;
      background: var(--color-bg-tertiary);
    }

    .eco-section__content {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 4rem;
      align-items: center;
    }

    .eco-section__title {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 1rem;
    }

    .eco-section__desc {
      font-size: 1rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .eco-section__features {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .eco-feature {
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      h4 { font-size: 0.95rem; font-weight: 600; color: var(--color-text); margin-bottom: 0.2rem; }
      p { font-size: 0.85rem; color: var(--color-text-muted); }
    }

    .eco-feature__icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background: var(--color-primary-100);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .eco-section__visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .eco-circle {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .eco-circle--lg {
      width: 280px;
      height: 280px;
      background: var(--color-primary-100);
    }

    .eco-circle--md {
      width: 200px;
      height: 200px;
      background: var(--color-primary-200);
    }

    .eco-circle--sm {
      width: 120px;
      height: 120px;
      background: var(--color-primary);
      color: var(--color-text-inverse);
    }

    /* ===================== BUTTONS ===================== */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.8rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 0.9rem;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all var(--transition-fast);
    }

    .btn--primary {
      background: var(--color-primary);
      color: var(--color-text-inverse);
      &:hover { background: var(--color-primary-dark); box-shadow: var(--shadow-md); }
    }

    .btn--outline {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: transparent;
      &:hover { background: var(--color-primary); color: var(--color-text-inverse); }
    }

    .btn--accent {
      background: var(--color-accent);
      color: #fff;
      &:hover { background: var(--color-accent-dark); box-shadow: var(--shadow-md); }
    }

    .btn--lg {
      padding: 1rem 2.2rem;
      font-size: 0.95rem;
    }

    /* ===================== UTILS ===================== */
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* ===================== RESPONSIVE ===================== */
    @media (max-width: 1024px) {
      .hero__content { grid-template-columns: 1fr; gap: 2rem; }
      .hero__visual { display: none; }
      .hero { min-height: auto; padding: 4rem 0; }
      .hero__title { font-size: 2.8rem; }
      .products-grid { grid-template-columns: repeat(3, 1fr); }
      .products-grid--featured { grid-template-columns: repeat(3, 1fr); }
      .eco-section__content { grid-template-columns: 1fr; }
      .eco-section__visual { display: none; }
    }

    @media (max-width: 768px) {
      .products-grid { grid-template-columns: repeat(2, 1fr); }
      .products-grid--featured { grid-template-columns: repeat(2, 1fr); }
      .hero__title { font-size: 2.2rem; }
      .hero__stats { gap: 1.5rem; }
      .promo-banner__content { flex-direction: column; text-align: center; }
      .promo-banner__visual { margin-top: 2rem; }
      .section__header { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
    }

    @media (max-width: 480px) {
      .products-grid { grid-template-columns: 1fr; }
      .products-grid--featured { grid-template-columns: 1fr; }
      .hero__actions { flex-direction: column; }
      .hero__stats { flex-wrap: wrap; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  newArrivals: Product[] = [];
  saleProducts: Product[] = [];
  premiumProducts: Product[] = [];
  featuredProducts: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    forkJoin({
      newArrivals: this.productService.getProducts({ pageSize: 4, sortBy: 'createdAt', sortDirection: 'desc' }),
      saleProducts: this.productService.getProducts({ pageSize: 4, sortBy: 'price', sortDirection: 'asc' }),
      premiumProducts: this.productService.getProducts({ pageSize: 3, sortBy: 'price', sortDirection: 'desc' }),
      featured: this.productService.getFeaturedProducts(4),
      categories: this.categoryService.getCategories()
    }).subscribe(results => {
      this.newArrivals = results.newArrivals.items;
      this.saleProducts = results.saleProducts.items;
      this.premiumProducts = results.premiumProducts.items;
      this.featuredProducts = results.featured;
      this.categories = results.categories.slice(0, 6);
    });
  }
}

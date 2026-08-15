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
      <div class="hero__bg-photo"></div>
      <div class="container hero__content">
        <div class="hero__text">
          <span class="hero__badge">
            New Season Collection 2026
          </span>
          <h1 class="hero__title">
            Carry Your <span class="hero__highlight">Confidence</span>
          </h1>
          <p class="hero__subtitle">
            Our style deserves more—discover beautiful bags at irresistible prices.
          </p>
          <div class="hero__actions">
            <a routerLink="/products" class="btn btn--primary btn--lg">Explore Collection</a>
            <a routerLink="/products" [queryParams]="{tag: 'new'}" class="btn btn--outline btn--lg">New Arrivals</a>
          </div>
          <div class="hero__stats">
            <div class="hero__stat">
              <span class="hero__stat-number">50K+</span>
              <span class="hero__stat-label">Happy Customers</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-number">Premium</span>
              <span class="hero__stat-label">Quality Materials</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-number">Worldwide</span>
              <span class="hero__stat-label">Free Shipping</span>
            </div>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__image-grid">
            <div class="hero__image-card hero__image-card--1">
              <img src="/assets/images/black-hobo-bag.png" alt="Black Structured Shoulder Hobo Bag" />
            </div>
            <div class="hero__image-card hero__image-card--2">
              <img src="/assets/images/olive-green-tote-bag.png" alt="Olive Green Structured Tote Bag" />
            </div>
            <div class="hero__image-card hero__image-card--3">
              <img src="/assets/images/burgundy-barrel-bag.png" alt="Burgundy Chain-Handle Barrel Bag" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES SECTION -->
    <section class="section categories-section">
      <div class="container">
        <div class="section__header">
          <span class="section__eyebrow">Collections</span>
          <h2 class="section__title">Shop by Category</h2>
          <p class="section__subtitle">Curated selections for every occasion</p>
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
          <p class="promo-banner__desc">Join the LUXEPOUCH circle and enjoy exclusive member perks, early access, and styling edits curated just for you.</p>
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

    <!-- WHY CHOOSE US SECTION -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-section__content">
          <div class="trust-section__text">
            <h2 class="trust-section__title">Why Choose LUXEPOUCH</h2>
            <p class="trust-section__desc">
              Every piece we carry is chosen for its craftsmanship, durability and timeless design.
              Here's what you can always count on when you shop with us.
            </p>
            <div class="trust-section__features">
              <div class="trust-feature">
                <div class="trust-feature__icon">✦</div>
                <div>
                  <h4>Premium Materials</h4>
                  <p>Full-grain leather and durable hardware built to age beautifully</p>
                </div>
              </div>
              <div class="trust-feature">
                <div class="trust-feature__icon">🚚</div>
                <div>
                  <h4>Free Worldwide Shipping</h4>
                  <p>Every order ships free, no minimum spend required</p>
                </div>
              </div>
              <div class="trust-feature">
                <div class="trust-feature__icon">🔒</div>
                <div>
                  <h4>Secure Checkout & Easy Returns</h4>
                  <p>Encrypted payments plus 30 days to change your mind</p>
                </div>
              </div>
            </div>
          </div>
          <div class="trust-section__visual">
            <div class="trust-circle trust-circle--lg">
              <div class="trust-circle trust-circle--md">
                <div class="trust-circle trust-circle--sm">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M6 8h12l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section class="section">
      <div class="container">
        <div class="section__header section__header--center">
          <span class="section__eyebrow">Testimonials</span>
          <h2 class="section__title">Loved by Thousands</h2>
          <p class="section__subtitle">Real words from real LUXEPOUCH customers</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__quote">"The leather quality is incredible for the price. My tote still looks brand new after a year of daily use."</p>
            <div class="testimonial-card__author">
              <span class="testimonial-card__name">Amara O.</span>
              <span class="testimonial-card__role">Verified Buyer</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__quote">"Fast shipping, beautiful packaging, and the crossbody bag exceeded every expectation. Already eyeing my next piece."</p>
            <div class="testimonial-card__author">
              <span class="testimonial-card__name">Priya S.</span>
              <span class="testimonial-card__role">Verified Buyer</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__quote">"Customer service helped me pick the perfect gift. Elegant design that gets compliments every time I wear it."</p>
            <div class="testimonial-card__author">
              <span class="testimonial-card__name">Daniel K.</span>
              <span class="testimonial-card__role">Verified Buyer</span>
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
            <span class="section__eyebrow">Bestsellers</span>
            <h2 class="section__title">Most Popular</h2>
            <p class="section__subtitle">Our most loved pieces, chosen by you</p>
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
            <app-product-card [product]="product" badge="bestseller" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ===================== HERO ===================== */
    .hero {
      position: relative;
      padding: 6rem 0;
      overflow: hidden;
      min-height: 90vh;
      display: flex;
      align-items: center;
    }

    .hero__bg {
      position: absolute;
      inset: 0;
      background: var(--gradient-hero);
      opacity: 0.03;
      z-index: 0;
    }

    .hero__bg-photo {
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: url('/assets/images/background1.png');
      background-size: cover;
      background-position: left center;
      opacity: 0.75;
      -webkit-mask-image: linear-gradient(100deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0.35) 50%, transparent 62%);
      mask-image: linear-gradient(100deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0.35) 50%, transparent 62%);
      animation: heroPhotoDrift 18s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes heroPhotoDrift {
      0%, 100% { background-position: left center; }
      50% { background-position: 58% center; }
    }

    .hero__content {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero__text {
      position: relative;
      padding: 2rem 2rem 2rem 0;
    }

    .hero__text::before {
      content: '';
      position: absolute;
      inset: -1.5rem -1.5rem -1.5rem -3rem;
      background: linear-gradient(100deg, var(--color-bg) 0%, var(--color-bg) 55%, transparent 100%);
      opacity: 0.72;
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      z-index: -1;
      border-radius: var(--radius-xl);
    }

    .hero__badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 1.2rem;
      background: transparent;
      color: var(--color-accent);
      border: 1px solid var(--color-accent);
      border-radius: var(--radius-full);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 2rem;
    }

    .hero__title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 600;
      line-height: 1.1;
      color: var(--color-text);
      margin-bottom: 1.5rem;
    }

    .hero__highlight {
      color: var(--color-accent);
      font-style: italic;
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
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-xl);
      overflow: hidden;
      padding: 1.75rem;
      background:
        radial-gradient(circle at 50% 42%, var(--color-primary-100) 0%, transparent 65%),
        linear-gradient(160deg, var(--color-bg-secondary) 0%, var(--color-surface) 100%);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow:
        0 24px 48px -20px rgba(0, 0, 0, 0.22),
        0 4px 12px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      transition: transform var(--transition-normal), box-shadow var(--transition-normal);

      &:hover {
        transform: translateY(-6px);
        box-shadow:
          0 32px 60px -18px rgba(0, 0, 0, 0.28),
          0 6px 16px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.5);
      }

      img {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 22px 22px rgba(20, 15, 10, 0.22));
        transition: transform var(--transition-slow);
      }

      &:hover img {
        transform: scale(1.045);
      }
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
      position: relative;
      padding: 4rem 0;
      overflow: hidden;
      background-image: var(--gradient-primary), url('/assets/images/luxepouchbackground.png');
      background-size: cover, cover;
      background-position: center, right center;
      background-repeat: no-repeat, no-repeat;
      background-blend-mode: soft-light;
    }

    .promo-banner__content {
      position: relative;
      z-index: 1;
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

    /* ===================== TRUST SECTION ===================== */
    .trust-section {
      padding: 5rem 0;
      background: var(--color-bg-tertiary);
    }

    .trust-section__content {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 4rem;
      align-items: center;
    }

    .trust-section__title {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 1rem;
    }

    .trust-section__desc {
      font-size: 1rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .trust-section__features {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .trust-feature {
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      h4 { font-size: 0.95rem; font-weight: 600; color: var(--color-text); margin-bottom: 0.2rem; }
      p { font-size: 0.85rem; color: var(--color-text-muted); }
    }

    .trust-feature__icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background: var(--color-primary-100);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .trust-section__visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .trust-circle {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .trust-circle--lg {
      width: 280px;
      height: 280px;
      background: var(--color-primary-100);
    }

    .trust-circle--md {
      width: 200px;
      height: 200px;
      background: var(--color-primary-200);
    }

    .trust-circle--sm {
      width: 120px;
      height: 120px;
      background: var(--color-primary);
      color: var(--color-text-inverse);
    }

    /* ===================== TESTIMONIALS ===================== */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .testimonial-card {
      padding: 2rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      transition: all var(--transition-normal);

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-3px);
      }
    }

    .testimonial-card__stars {
      color: var(--color-accent);
      letter-spacing: 0.15em;
      margin-bottom: 1rem;
    }

    .testimonial-card__quote {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .testimonial-card__author {
      display: flex;
      flex-direction: column;
    }

    .testimonial-card__name {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--color-text);
    }

    .testimonial-card__role {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      margin-top: 0.15rem;
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
      .trust-section__content { grid-template-columns: 1fr; }
      .trust-section__visual { display: none; }
      .testimonials-grid { grid-template-columns: 1fr; }
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

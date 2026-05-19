import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer__main">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <div class="footer__logo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                </svg>
                <span>EcoStore</span>
              </div>
              <p class="footer__tagline">
                Sustainable shopping for a better tomorrow. Every purchase plants a seed for the future.
              </p>
              <div class="footer__certifications">
                <span class="cert-badge">♻️ Carbon Neutral</span>
                <span class="cert-badge">🌱 Eco Certified</span>
                <span class="cert-badge">🤝 Fair Trade</span>
              </div>
            </div>

            <div class="footer__links">
              <h4>Shop</h4>
              <a routerLink="/products" [queryParams]="{tag: 'new'}">New Arrivals</a>
              <a routerLink="/products" [queryParams]="{tag: 'sale'}">Sale</a>
              <a routerLink="/products" [queryParams]="{tag: 'premium'}">Premium Collection</a>
              <a routerLink="/products">All Products</a>
            </div>

            <div class="footer__links">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Shipping Info</a>
              <a href="#">Returns & Exchange</a>
              <a href="#">Size Guide</a>
            </div>

            <div class="footer__links">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Sustainability</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>

            <div class="footer__newsletter">
              <h4>Stay Connected</h4>
              <p>Get eco-tips and exclusive offers straight to your inbox.</p>
              <form class="footer__form" (submit)="$event.preventDefault()">
                <input type="email" placeholder="Enter your email" class="footer__input" />
                <button type="submit" class="footer__submit-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="container footer__bottom-content">
          <p>&copy; 2024 EcoStore. All rights reserved. Made with 💚 for the planet.</p>
          <div class="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-primary-900);
      color: var(--color-text-inverse);
      margin-top: auto;
    }

    .footer__main {
      padding: 4rem 0 3rem;
    }

    .footer__grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
      gap: 2.5rem;
    }

    .footer__brand {}

    .footer__logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-primary-200);
    }

    .footer__tagline {
      color: rgba(255,255,255,0.7);
      line-height: 1.6;
      margin-bottom: 1.2rem;
      font-size: 0.9rem;
    }

    .footer__certifications {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .cert-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.3rem 0.7rem;
      background: rgba(255,255,255,0.08);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      border: 1px solid rgba(255,255,255,0.12);
    }

    .footer__links {
      h4 {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 1.2rem;
        color: var(--color-primary-200);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      a {
        display: block;
        color: rgba(255,255,255,0.7);
        text-decoration: none;
        padding: 0.35rem 0;
        font-size: 0.88rem;
        transition: color var(--transition-fast);
        &:hover { color: #fff; }
      }
    }

    .footer__newsletter {
      h4 {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.8rem;
        color: var(--color-primary-200);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      p {
        color: rgba(255,255,255,0.7);
        font-size: 0.88rem;
        margin-bottom: 1rem;
        line-height: 1.5;
      }
    }

    .footer__form {
      display: flex;
      gap: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .footer__input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: none;
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 0.85rem;
      outline: none;
      &::placeholder { color: rgba(255,255,255,0.5); }
    }

    .footer__submit-btn {
      padding: 0.75rem 1.2rem;
      background: var(--color-primary-light);
      border: none;
      color: #fff;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background var(--transition-fast);
      &:hover { background: var(--color-primary); }
    }

    .footer__bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 1.5rem 0;
    }

    .footer__bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      p {
        color: rgba(255,255,255,0.5);
        font-size: 0.82rem;
      }
    }

    .footer__bottom-links {
      display: flex;
      gap: 1.5rem;

      a {
        color: rgba(255,255,255,0.5);
        text-decoration: none;
        font-size: 0.82rem;
        transition: color var(--transition-fast);
        &:hover { color: rgba(255,255,255,0.8); }
      }
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    @media (max-width: 1024px) {
      .footer__grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .footer__brand { grid-column: 1 / -1; }
      .footer__newsletter { grid-column: 1 / -1; }
    }

    @media (max-width: 640px) {
      .footer__grid { grid-template-columns: 1fr; }
      .footer__bottom-content { flex-direction: column; gap: 1rem; text-align: center; }
    }
  `]
})
export class FooterComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="dashboard__header">
        <div>
          <h1 class="dashboard__title">Dashboard</h1>
          <p class="dashboard__subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div class="dashboard__actions">
          <button class="btn btn--outline btn--sm">Export</button>
          <button class="btn btn--primary btn--sm">+ Add Product</button>
        </div>
      </div>

      <!-- STATS CARDS -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--revenue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">Total Revenue</span>
            <span class="stat-card__value">$48,290</span>
            <span class="stat-card__change stat-card__change--up">+12.5% from last month</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--orders">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">Total Orders</span>
            <span class="stat-card__value">1,284</span>
            <span class="stat-card__change stat-card__change--up">+8.2% from last month</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--products">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            </svg>
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">Active Products</span>
            <span class="stat-card__value">2,500</span>
            <span class="stat-card__change stat-card__change--up">+500 added recently</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--customers">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">Customers</span>
            <span class="stat-card__value">3,847</span>
            <span class="stat-card__change stat-card__change--up">+18% from last month</span>
          </div>
        </div>
      </div>

      <!-- CONTENT GRID -->
      <div class="dashboard__grid">
        <!-- RECENT ORDERS -->
        <div class="card card--wide">
          <div class="card__header">
            <h3 class="card__title">Recent Orders</h3>
            <a routerLink="/orders" class="card__link">View all</a>
          </div>
          <div class="card__body">
            <table class="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="table__order-id">#ORD-2847</td>
                  <td>Sarah Johnson</td>
                  <td><span class="status-badge status-badge--completed">Completed</span></td>
                  <td class="table__amount">$249.00</td>
                </tr>
                <tr>
                  <td class="table__order-id">#ORD-2846</td>
                  <td>Mike Chen</td>
                  <td><span class="status-badge status-badge--processing">Processing</span></td>
                  <td class="table__amount">$189.50</td>
                </tr>
                <tr>
                  <td class="table__order-id">#ORD-2845</td>
                  <td>Emma Wilson</td>
                  <td><span class="status-badge status-badge--pending">Pending</span></td>
                  <td class="table__amount">$312.00</td>
                </tr>
                <tr>
                  <td class="table__order-id">#ORD-2844</td>
                  <td>James Brown</td>
                  <td><span class="status-badge status-badge--completed">Completed</span></td>
                  <td class="table__amount">$156.75</td>
                </tr>
                <tr>
                  <td class="table__order-id">#ORD-2843</td>
                  <td>Lisa Park</td>
                  <td><span class="status-badge status-badge--shipped">Shipped</span></td>
                  <td class="table__amount">$428.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TOP PRODUCTS -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Top Products</h3>
            <a routerLink="/products" class="card__link">View all</a>
          </div>
          <div class="card__body">
            <div class="top-product-list">
              <div class="top-product">
                <div class="top-product__rank">1</div>
                <div class="top-product__info">
                  <span class="top-product__name">Classic Leather Tote</span>
                  <span class="top-product__sales">324 sales</span>
                </div>
                <span class="top-product__revenue">$28,916</span>
              </div>
              <div class="top-product">
                <div class="top-product__rank">2</div>
                <div class="top-product__info">
                  <span class="top-product__name">Urban Backpack</span>
                  <span class="top-product__sales">256 sales</span>
                </div>
                <span class="top-product__revenue">$19,712</span>
              </div>
              <div class="top-product">
                <div class="top-product__rank">3</div>
                <div class="top-product__info">
                  <span class="top-product__name">Crossbody Mini</span>
                  <span class="top-product__sales">198 sales</span>
                </div>
                <span class="top-product__revenue">$12,870</span>
              </div>
              <div class="top-product">
                <div class="top-product__rank">4</div>
                <div class="top-product__info">
                  <span class="top-product__name">Travel Luggage Set</span>
                  <span class="top-product__sales">142 sales</span>
                </div>
                <span class="top-product__revenue">$42,600</span>
              </div>
              <div class="top-product">
                <div class="top-product__rank">5</div>
                <div class="top-product__info">
                  <span class="top-product__name">Bamboo Clutch</span>
                  <span class="top-product__sales">118 sales</span>
                </div>
                <span class="top-product__revenue">$7,670</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .dashboard__title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .dashboard__subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    .dashboard__actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn--primary {
      background: var(--sidebar-bg);
      color: #fff;
      &:hover { opacity: 0.9; }
    }

    .btn--outline {
      background: var(--surface);
      color: var(--text-secondary);
      border: 1.5px solid var(--border);
      &:hover { border-color: var(--accent); color: var(--accent); }
    }

    .btn--sm { padding: 0.5rem 1rem; font-size: 0.78rem; }

    /* STATS */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      transition: background 0.3s, border-color 0.3s;
    }

    .stat-card__icon {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-card__icon--revenue { background: var(--success-bg); color: var(--success); }
    .stat-card__icon--orders { background: var(--info-bg); color: var(--info); }
    .stat-card__icon--products { background: var(--warning-bg); color: var(--warning); }
    .stat-card__icon--customers { background: #f3e8ff; color: #8b5cf6; }

    .stat-card__content { display: flex; flex-direction: column; }

    .stat-card__label {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .stat-card__value {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0.2rem 0;
    }

    .stat-card__change {
      font-size: 0.72rem;
      font-weight: 500;
    }

    .stat-card__change--up { color: var(--success); }
    .stat-card__change--down { color: var(--error); }

    /* CARDS */
    .dashboard__grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 1rem;
    }

    .card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      overflow: hidden;
      transition: background 0.3s, border-color 0.3s;
    }

    .card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border-light);
    }

    .card__title {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .card__link {
      font-size: 0.78rem;
      color: var(--accent);
      text-decoration: none;
      font-weight: 500;
      &:hover { text-decoration: underline; }
    }

    .card__body { padding: 0; }

    /* TABLE */
    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th {
      text-align: left;
      padding: 0.7rem 1.25rem;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      background: var(--content-bg);
    }

    .table td {
      padding: 0.75rem 1.25rem;
      font-size: 0.82rem;
      color: var(--text-secondary);
      border-top: 1px solid var(--border-light);
    }

    .table__order-id { font-weight: 600; color: var(--text-primary); }
    .table__amount { font-weight: 600; color: var(--text-primary); }

    .status-badge {
      display: inline-flex;
      padding: 0.25rem 0.6rem;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    .status-badge--completed { background: var(--success-bg); color: var(--success); }
    .status-badge--processing { background: var(--info-bg); color: var(--info); }
    .status-badge--pending { background: var(--warning-bg); color: var(--warning); }
    .status-badge--shipped { background: #f3e8ff; color: #8b5cf6; }

    /* TOP PRODUCTS */
    .top-product-list {
      display: flex;
      flex-direction: column;
    }

    .top-product {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1.25rem;
      border-bottom: 1px solid var(--border-light);

      &:last-child { border-bottom: none; }
    }

    .top-product__rank {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--content-bg);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .top-product__info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .top-product__name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .top-product__sales {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .top-product__revenue {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .dashboard__grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Dashboard</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Products</h3>
        <p class="stat-value">0</p>
      </div>
      <div class="stat-card">
        <h3>Total Orders</h3>
        <p class="stat-value">0</p>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <p class="stat-value">$0.00</p>
      </div>
      <div class="stat-card">
        <h3>Customers</h3>
        <p class="stat-value">0</p>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
    .stat-card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-card h3 { margin: 0; font-size: 0.85rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-value { font-size: 2rem; font-weight: 700; margin: 0.5rem 0 0; color: #1e293b; }
  `]
})
export class DashboardComponent {}

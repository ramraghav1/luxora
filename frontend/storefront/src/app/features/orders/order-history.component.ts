import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="container"><h1>Order History</h1><p>Order history feature - to be implemented.</p></div>`,
  styles: [`.container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }`]
})
export class OrderHistoryComponent {}

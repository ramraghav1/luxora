import { Injectable, signal, computed } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'eco_store_cart';

  private readonly cartItems = signal<CartItem[]>(this.loadFromStorage());

  readonly items = this.cartItems.asReadonly();
  readonly itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() => this.cartItems().reduce((sum, item) => sum + item.totalPrice, 0));

  readonly cart = computed<Cart>(() => ({
    items: this.cartItems(),
    subtotal: this.subtotal(),
    itemCount: this.itemCount()
  }));

  addToCart(product: { id: string; name: string; slug: string; mainImageUrl?: string; price: number }, quantity: number = 1): void {
    const items = [...this.cartItems()];
    const existingIndex = items.findIndex(i => i.productId === product.id);

    if (existingIndex >= 0) {
      items[existingIndex] = {
        ...items[existingIndex],
        quantity: items[existingIndex].quantity + quantity,
        totalPrice: (items[existingIndex].quantity + quantity) * items[existingIndex].unitPrice
      };
    } else {
      items.push({
        productId: product.id,
        productName: product.name,
        slug: product.slug,
        imageUrl: product.mainImageUrl,
        unitPrice: product.price,
        quantity,
        totalPrice: product.price * quantity
      });
    }

    this.cartItems.set(items);
    this.saveToStorage(items);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const items = this.cartItems().map(item =>
      item.productId === productId
        ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
        : item
    );

    this.cartItems.set(items);
    this.saveToStorage(items);
  }

  removeFromCart(productId: string): void {
    const items = this.cartItems().filter(i => i.productId !== productId);
    this.cartItems.set(items);
    this.saveToStorage(items);
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveToStorage([]);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}

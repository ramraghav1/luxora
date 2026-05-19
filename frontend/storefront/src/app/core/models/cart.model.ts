export interface CartItem {
  productId: string;
  productName: string;
  slug: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

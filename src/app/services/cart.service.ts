import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];

  addToCart(item: any) {
    this.cart.push(item);
  }

  getCart() {
    return this.cart;
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
  }
  clearCart(){
    this.cart = [];
  }
  getCartItemCount(): number {
    return this.cart.length;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];

  addToCart(item: any) {
    const ItemIndex = this.cart.findIndex(cartItem => cartItem.product.productId === item.product.productId);
    if (ItemIndex > -1) {

      this.cart[ItemIndex].quantity += item.quantity;
    } else {

      this.cart.push(item);
    }
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

import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { OrderdetailsService } from '../../services/orderdetails.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrl: './cart-user.component.scss'
})
export class CartUserComponent {
  cart: any[] = [];
  userId: string | null;
  orderNote: string = '';
  constructor(private cartService: CartService,
    private orderService: OrderService,
    private orderDetailsService: OrderdetailsService,
    private authService : AuthService,
    private router: Router, private snackBar: MatSnackBar
  ) {
    this.cart = this.cartService.getCart();
    this.userId = this.authService.getUserInfoFromToken().userId;
  }
  removeItem(index: number): void {
    this.cartService.removeItem(index);

    this.cart = this.cartService.getCart();
  }
  calculateSubtotal(): number {
    let subtotal = 0;
    this.cart.forEach(item => {
      subtotal += item.product.productPrice * item.quantity;
    });
    return subtotal;
  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  generateRandomOrderCode(): string {
    const min = 10000;
    const max = 99999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + randomNum.toString();
  }
  generateRandomOrderId(): string {
    return uuidv4();
  }
  checkout(): void {
    if (!this.orderNote) {
      this.orderNote = 'Không có lưu ý';
    }
    const order = {
      orderId:  this.generateRandomOrderId(),
      userId: this.userId,
      totalAmount: this.calculateSubtotal(),
      orderCode: this.generateRandomOrderCode(),
      paymentType: 0,
      status: 0,
      note: this.orderNote,
      dateCreated: this.getCurrentDateTime(),
      dateUpdated: this.getCurrentDateTime()
    };
    order.note = this.orderNote;
    this.orderService.addOrder(order).subscribe({
      next: () => {

        this.snackBar.open('Đơn hàng đã được đặt thành công', 'Đóng', { duration: 3000 });

        this.sendOrderDetails(order.orderId);
        this.cartService.clearCart();
        this.cart = [];
        this.router.navigate(['trang-chu/gio-hang']);
      },
      error: (error) => {
        console.error('Error adding order:', error);
      }
    });
  }
  sendOrderDetails(orderId: string): void {
    this.cart.forEach(item => {
      const orderDetail = {
        orderId: orderId,
        productId: item.product.productId,
        quantity: item.quantity,
        price: item.product.productPrice,
        total: item.product.productPrice * item.quantity,
        dateCreated: this.getCurrentDateTime(),
        dateUpdated: this.getCurrentDateTime()
      };


      this.orderDetailsService.addOrderDetail(orderDetail).subscribe({
        next: () => {
          console.log('Thêm chi tiết đơn hàng thành công');
        },
        error: (error) => {
          console.error('Error adding order details:', error);
        }
      });
    });
  }
}

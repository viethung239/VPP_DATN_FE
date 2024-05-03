import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../services/order.service';
import { ProfileUserComponent } from '../profile-user.component';
import { OrderdetailsService } from '../../../services/orderdetails.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrl: './detail-cart.component.scss'
})
export class DetailCartComponent {

  orderId: string | null;
  orderdetails: any[] = [];
  Product: any[] =[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
     private orderdtService : OrderdetailsService ,
     private productService : ProductService,

    private dialogRef: MatDialogRef<ProfileUserComponent>) {
    this.orderId = data.orderId;

  }

  ngOnInit(): void {
    if (this.orderId) {
      this.loadOrderDetails();
    }
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.Product = data;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  getTenSanPham(productId: string): string {
    const sanPham = this.Product.find(c => c.productId === productId);
    return sanPham ? sanPham.productName : '';
  }
  getAnhSanPham(productId: string): string {
    const sanPham = this.Product.find(c => c.productId === productId);
    const imgUrl = sanPham ? sanPham.productImage : '';
    return imgUrl ? 'assets/products/' + imgUrl : '';
  }
  loadOrderDetails(): void {
    this.orderdtService.getListOrderDetail().subscribe({
      next: (orderdetails: any[]) => {
        this.orderdetails = orderdetails.filter(detail => detail.orderId === this.orderId);
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}

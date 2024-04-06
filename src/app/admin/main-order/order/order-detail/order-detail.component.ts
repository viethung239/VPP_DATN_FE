import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../services/user.service';
import { OrderService } from '../../../../services/order.service';
import { OrderdetailsService } from '../../../../services/orderdetails.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  User: any[] =[];
  orderId: string | null;

  order: any;
  orderdetails: any[] = [];
  Product: any[] =[];
  orderFullName: string | undefined;
  orderPhone: string | undefined;
  userAddress: string | undefined;
  userComune: string | undefined;
  userDistrict: string | undefined;
  userCity: string | undefined;
  constructor(private route: ActivatedRoute,  private orderService: OrderService,
     private orderdtService : OrderdetailsService , private userService:UserService,
     private productService : ProductService) {
    this.orderId = null;


  }
  displayedColumns: string[] = ['productId', 'price', 'quantity', 'total'];

  ngOnInit(): void {
    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.Product = data;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
    this.orderId= this.route.snapshot.paramMap.get('id')!;

    this.getOrderData(this.orderId);
    this.getOrderDetailbyId(this.orderId);
  }
  getTenSanPham(productId: string): string {
    const sanPham = this.Product.find(c => c.productId === productId);
    return sanPham ? sanPham.productName : '';
  }
  getTenKhach(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.fullName : '';
  }
  getSDTKhach(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.phone : '';
  }
  getOrderData(id: string): void {
    this.orderService.getOrderById(id).subscribe((data: any) => {
      this.order = data;
      this.orderFullName = this.getTenKhach(this.order.userId);
      this.orderPhone = this.getSDTKhach(this.order.userId);
      this.userService.getUserById(this.order.userId).subscribe((userData: any) => {
        this.userAddress = userData.address;
        this.userComune = userData.comune;
        this.userDistrict = userData.district;
        this.userCity = userData.city;
      });
    });

  }
  getOrderDetailbyId(id: string): void {
    this.orderdtService.getListOrderDetail().subscribe((data: any[]) => {
        this.orderdetails = data.filter(detail => detail.orderId === id);

    });
  }
}

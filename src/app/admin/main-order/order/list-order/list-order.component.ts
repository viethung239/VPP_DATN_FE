import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../../../main-user/user/list-user/list-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../../../../services/order.service';
import { OrderStatusComponent } from '../order-status/order-status.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss'
})
export class ListOrderComponent {
  User: UserData[] = [];
  displayedColumns: string[] = ['orderCode', 'userId','userPhone', 'status','paymentType', 'dateCreated','dateUpdated','actions'];
  searchKeyword: string = '';
  dataSource = new MatTableDataSource<OrderData>([]);
  orderId: string | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orderService: OrderService,
    private userService:UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngAfterViewInit() {

    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;

      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });

    this.dataSource.paginator = this.paginator;


    this.getDataOrder();
  }
  getTenKhach(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.fullName : '';
  }
  getSDTKhach(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.phone : '';
  }
  getDataOrder(): void {
    this.orderService.getListOrder().subscribe({
      next: (data) => {
        data.sort((a: OrderData, b: OrderData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: OrderData, b: OrderData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: OrderData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
      this.orderService.deleteOrder(String(element.orderId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa đơn hàng thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataOrder();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
  getStatus(status: number): string {
    switch (status) {
      case 0:
        return "Đang chuẩn bị";
      case 1:
        return "Đang giao hàng";
      case 2:
        return "Giao hàng thành công";
      case 3:
        return "Đơn hàng đã hủy";
      default:
        return "Không xác định";
    }
  }
  openDialogEdit(orderId :string): void {
    const dialogRef = this.dialog.open(OrderStatusComponent, {
      width: '400px',
      height: '200px',
      data: { orderId: orderId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDataOrder();
    });
  }

}
export interface OrderData {

  orderId: string,
  userId: string,
  totalAmount:string,
  orderCode:string,
  paymentType: string,
  status:string,
  note: string,
  dateCreated:string,
  dateUpdated: string
}

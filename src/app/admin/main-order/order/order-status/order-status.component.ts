import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListOrderComponent } from '../list-order/list-order.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../../../services/order.service';
import { WareHouseDetailsService } from '../../../../services/ware-house-details.service';
import { WarehouseDetail } from '../../../../user/cart-user/cart-user.component';
;


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {
  OrderForm!: FormGroup;
  orderId: string | null;
  ngayTaoOriginal: string | null;
  userId: string | null;
  totalAmount: string | null;
  paymentType: string | null;

  note: string | null;
  orderCode: string | null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private fb: FormBuilder,  private orderService: OrderService,
    private warehouseDetailService: WareHouseDetailsService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ListOrderComponent>) {
    this.orderId = data.orderId;
    this.ngayTaoOriginal = null;
    this.userId = null;
    this.totalAmount = null;
    this.paymentType = null;
    this.note = null;
    this.orderCode = null;
  }

  ngOnInit(): void {

    this.OrderForm = this.fb.group({
    orderId: this.orderId,
    status: ['',  Validators.required],
    dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });


    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.orderId !== null) {
      this.orderService.getOrderById(this.orderId).subscribe({
        next: (orderData) => {
          if (orderData) {
            this.ngayTaoOriginal = orderData.dateCreated;
            this.userId = orderData.userId;
            this.totalAmount = orderData.totalAmount;
            this.orderCode = orderData.orderCode;
            this.paymentType = orderData.paymentType;
            this.note = orderData.note;
            this.OrderForm.patchValue({
              status: orderData.status,
              note: orderData.note,
            });
          } else {
            console.error('Không tìm thấy với id:', this.orderId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.OrderForm.valid && this.orderId !== null) {
      const updatedOrder = {
        ...this.OrderForm.value,
        dateCreated: this.ngayTaoOriginal,
        userId: this.userId,
        totalAmount: this.totalAmount,
        orderCode: this.orderCode,
        paymentType: this.paymentType,
        note: this.note,
      };

      this.orderService.updateOrder(this.orderId, updatedOrder).subscribe({
        next: () => {
          console.log('Cập nhật trạng thái thành công');
          this.snackBar.open('Sửa trạng thái đơn hàng thành công', 'Đóng', {
            duration: 3000,
          });
          this.closeDialog();
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    }

  }
}

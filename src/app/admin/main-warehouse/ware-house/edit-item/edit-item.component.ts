import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsWarehouseComponent } from '../details-warehouse/details-warehouse.component';
import { WareHouseDetailsService } from '../../../../services/ware-house-details.service';
import { validate } from 'uuid';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent {
  WHDTForm!: FormGroup;
  wareHouseDetailId: string | null;
  ngayTaoOriginal: string | null;
  supplierId: string | null;
  productId: string | null;
  wareHouseId: string | null;
  isActive: string | null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {  wareHouseDetailId: string },
    private fb: FormBuilder,   private wareHouseDetailService : WareHouseDetailsService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DetailsWarehouseComponent>) {
    this.wareHouseDetailId = data.wareHouseDetailId;
    this.ngayTaoOriginal = null;
    this.supplierId = null;
    this.productId = null
    this.wareHouseId = null;
    this.isActive = null;
  }
  dataUpdated: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit(): void {

    this.WHDTForm = this.fb.group({
    wareHouseDetailId:this.wareHouseDetailId,
    quantity:['',Validators.required],
    dateUpdated: [this.getCurrentDateTime(), Validators.required],


    });

    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.wareHouseDetailId !== null) {
      this.wareHouseDetailService.getWareHouseDetailById(this.wareHouseDetailId).subscribe({
        next: (whdtData) => {
          if (whdtData) {
            this.ngayTaoOriginal = whdtData.dateCreated;
            this.wareHouseId = whdtData.wareHouseId;
            this.supplierId = whdtData.supplierId;
            this.productId = whdtData.productId;
            this.isActive = whdtData.isActive;
            this.WHDTForm.patchValue({
              quantity: whdtData.quantity,

            });
          } else {
            console.error('Không tìm thấy whht với id:', this.wareHouseDetailId);
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
    if (this.WHDTForm.valid && this.wareHouseDetailId !== null) {
      const updatedWHDT = {
        ...this.WHDTForm.value,
        dateCreated: this.ngayTaoOriginal,
        wareHouseId:this.wareHouseId,
        productId:this.productId,
        supplierId:this.supplierId,
        isActive: this.isActive,
      };

      this.wareHouseDetailService.updateWareHouseDetail(this.wareHouseDetailId, updatedWHDT).subscribe({
        next: () => {
          console.log('Cập nhật thành công');
          this.snackBar.open('Sửa thành công', 'Đóng', {
            duration: 3000,
          });
          this.dataUpdated.emit();
          this.closeDialog();
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    }

  }
  tangSoLuong(): void {
    let currentValue = this.WHDTForm.get('quantity')?.value ?? 0;
    currentValue = Number(currentValue);
    this.WHDTForm.get('quantity')?.setValue(currentValue + 1);
  }

  giamSoLuong(): void {
    let currentValue = this.WHDTForm.get('quantity')?.value ?? 0;
    currentValue = Number(currentValue);
    if (currentValue > 1) {
      this.WHDTForm.get('quantity')?.setValue(currentValue - 1);
    }
  }
}

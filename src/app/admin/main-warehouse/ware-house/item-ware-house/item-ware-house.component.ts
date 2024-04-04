import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WareHouseDetailsService } from '../../../../services/ware-house-details.service';
import { ProductService } from '../../../../services/product.service';
import { SupplierService } from '../../../../services/supplier.service';

@Component({
  selector: 'app-item-ware-house',
  templateUrl: './item-ware-house.component.html',
  styleUrl: './item-ware-house.component.scss'
})
export class ItemWareHouseComponent {

  WHDTForm: FormGroup;
  Product: any[] =[];
  Supplier: any[] =[];

  @Output() selectionConfirmed = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<ItemWareHouseComponent>,

      private productService:ProductService,
      private suppilerService: SupplierService,
      private fb: FormBuilder
    ) {


    this.WHDTForm = this.fb.group({

      wareHouseId:[data.wareHouseId, Validators.required],
      productId: ['', Validators.required],
      supplierId: ['', Validators.required],
      quantity:['1', Validators.required],
      isActive: [true, Validators.required],
      dateCreated:[this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
   });

  }
  ngOnInit(): void {
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.Product = data;
      },
      error: (error: any) => {
        console.error('Error fetching product:', error);
      }
    });
    this.suppilerService.getListSupplier().subscribe({
      next: (data: any) => {
        this.Supplier = data;
      },
      error: (error: any) => {
        console.error('Error fetching supplier:', error);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  confirmSelection(): void {
    if (this.WHDTForm.valid) {
      const whdt = this.WHDTForm.value;
      console.log('Dữ liệu chuẩn bị gửi:', whdt);
      this.selectionConfirmed.emit(whdt);
      this.closeDialog();
    } else {
      console.error('Data is null or undefined.', this.WHDTForm);

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

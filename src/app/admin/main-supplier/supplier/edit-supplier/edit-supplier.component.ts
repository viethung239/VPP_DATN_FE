import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../../../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataVN } from '../../../../dataVN/data-vn';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.scss'
})
export class EditSupplierComponent {

  cities: string[] = DataVN.cities;
  districts: string[] = DataVN.districtList;
  communes: string[] = DataVN.comuneList;
  SupplierForm!: FormGroup;
  supplierId: string | null;
  ngayTaoOriginal: string | null = null;
  isEditClicked: boolean = false;
  constructor(private fb: FormBuilder, private supplierService : SupplierService,

    private router: Router, private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.supplierId = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {


    this.supplierId = this.route.snapshot.paramMap.get('id');
    this.SupplierForm = this.fb.group({

      supplierName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      comune: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail.com$/)]],
      isActive: ['true', Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });

    this.loadDataForEdit();

  }
  onPhoneNumberInput(event: any): void {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {

      event.target.value = value.replace(/\D/g, '');
    }

    if (value.length > 10) {
      event.target.value = value.slice(0, 10);
    }
  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.supplierId !== null) {
      this.supplierService.getSupplierById(this.supplierId).subscribe({
        next: (supplierData) => {
          if (supplierData) {
            this.ngayTaoOriginal = supplierData.dateCreated;
            this.SupplierForm.patchValue({

              supplierName: supplierData.supplierName,
              phone: supplierData.phone,
              address: supplierData.address,
              comune : supplierData.comune,
              district: supplierData.district,
              city : supplierData.city,
              email: supplierData.email,
              isActive: supplierData.isActive,
              //

            });
          } else {
            console.error('Không tìm thấy nhà cung cấp với id:', this.supplierId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu nhà cung cấp với supplierId là null.');
    }
  }


  onSubmit() {
    if (!this.supplierId) {
      console.error('Không thể cập nhật nhà cung cấp với id là null.');
      return;
    }

    if (this.SupplierForm.valid) {
      const updatedSupplier = {
        ...this.SupplierForm.value,
        dateCreated: this.ngayTaoOriginal,
      };

      this.supplierService.updateSupplier(this.supplierId, updatedSupplier).subscribe({
        next: () => {
          console.log('Cập nhật nhà cung cấp thành công');
          this.snackBar.open('Sửa nhà cung cấp thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/nha-cung-cap']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');

    }
  }
  toggleEdit() {
    this.isEditClicked = !this.isEditClicked;
  }
}

import { Component } from '@angular/core';
import { SupplierService } from '../../../../services/supplier.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataVN } from '../../../../dataVN/data-vn';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.scss'
})
export class AddSupplierComponent {

  SupplierForm: FormGroup;
  cities: string[] = DataVN.cities;
  districts: string[] = DataVN.districtList;
  communes: string[] = DataVN.comuneList;
  constructor(private fb: FormBuilder, private supplierService : SupplierService,
    private router: Router, private snackBar: MatSnackBar) {

    this.SupplierForm = this.fb.group({


      supplierName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      comune: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail.com$/)]],
      isActive: ['true', Validators.required],
      dateCreated: [this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });
  }
  ngOnInit(): void {
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

  onSubmit() {
    console.log('Nhà cung cấp trước khi đươc gửi đi',this.SupplierForm);
    if (this.SupplierForm.valid) {

      const newSupplier = this.SupplierForm.value;

      this.supplierService.addSupplier(newSupplier).subscribe({
        next: () => {

          console.log('Thêm nhà cung cấp thành công');
          this.snackBar.open('Thêm nhà cung cấp thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nha-cung-cap']);
        },
        error: (error) => {
          console.error('Error adding Supplier:', error);
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  Category: any[] =[];
  ProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService,
    private categoryService : CategoryService,
    private router: Router, private snackBar: MatSnackBar) {

    this.ProductForm = this.fb.group({


      categoryId: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      sDescription: ['', Validators.required],
      lDescription: ['', Validators.required],
      productImage: ['', Validators.required],
      isActive: ['true', Validators.required],
      dateCreated: [this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],

    });
  }
  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe({
      next: (data: any) => {
        this.Category = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    this.ProductForm.patchValue({
      productImage: fileName
    });
  }
  onInputChange(event: any) {
    const input = event.target.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(input)) {
        this.ProductForm.get('productPrice')?.setErrors({ pattern: true });
    } else {
        this.ProductForm.get('productPrice')?.setErrors(null);
    }
}
  onSubmit() {
    console.log('sản phẩm trước khi đươc gửi đi',this.ProductForm);
    if (this.ProductForm.valid) {

      const newProduct = this.ProductForm.value;

      this.productService.addProduct(newProduct).subscribe({
        next: () => {

          console.log('Thêm sản phẩm thành công');
          this.snackBar.open('Thêm sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/san-pham/danh-sach-san-pham']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  Category: any[] =[];
  ProductForm!: FormGroup;
  productId: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private fb: FormBuilder, private productService: ProductService,
    private categoryService : CategoryService,
    private router: Router, private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.productId = null;
    this.ngayTaoOriginal = null;
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

    this.productId = this.route.snapshot.paramMap.get('id');
    this.ProductForm = this.fb.group({

      productId: this.productId,
      categoryId: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      sDescription: ['', Validators.required],
      lDescription: ['', Validators.required],
      productImage: ['', Validators.required],
      isActive: ['true', Validators.required],
      isHot:['',Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe({
        next: (productData) => {
          if (productData) {
            this.ngayTaoOriginal = productData.dateCreated;
            this.ProductForm.patchValue({

              categoryId: productData.categoryId,
              productName: productData.productName,
              productPrice: productData.productPrice,
              sDescription: productData.sDescription,
              lDescription: productData.lDescription,
              productImage: productData.productImage,
              isActive: productData.isActive,
              isHot: productData.isHot
              //

            });
          } else {
            console.error('Không tìm thấy sản phẩm  với id:', this.productId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu sản phẩm  với idSanPham là null.');
    }
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
    if (!this.productId) {
      console.error('Không thể cập nhật sản phẩm với id sản phẩm là null.');
      return;
    }

    if (this.ProductForm.valid) {
      const updatedProduct = {
        ...this.ProductForm.value,
        dateCreated: this.ngayTaoOriginal,
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: () => {
          console.log('Cập nhật sản phẩm thành công');
          this.snackBar.open('Sửa sản phẩm thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/san-pham/danh-sach-san-pham']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');

    }
  }
}

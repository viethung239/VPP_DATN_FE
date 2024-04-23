import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupCategoryService } from '../../../../services/group-category.service';
import { CategoryService } from '../../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  CategoryGroup: any[] =[];
  CategoryForm!: FormGroup;
  categoryId: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private fb: FormBuilder, private groupCategoryService: GroupCategoryService,
    private categoryService : CategoryService,
    private router: Router, private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.categoryId = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {

    this.groupCategoryService.getListCategoryGroup().subscribe({
      next: (data: any) => {
        this.CategoryGroup = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories group:', error);
      }
    });

    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.CategoryForm = this.fb.group({

      categoryId: this.categoryId,
      categoryGroupId: ['', Validators.required],
      categoryName: ['', Validators.required],

      isActive: ['true', Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.categoryId !== null) {
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (categoryData) => {
          if (categoryData) {
            this.ngayTaoOriginal = categoryData.dateCreated;
            this.CategoryForm.patchValue({

               categoryGroupId: categoryData.categoryGroupId,
               categoryName: categoryData.categoryName,

               isActive: categoryData.isActive,
              //

            });
          } else {
            console.error('Không tìm thấy sản phẩm  với id:', this.categoryId);
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

  onSubmit() {
    if (!this.categoryId) {
      console.error('Không thể cập nhật sản phẩm với id sản phẩm là null.');
      return;
    }

    if (this.CategoryForm.valid) {
      const updatedCategory = {
        ...this.CategoryForm.value,
        dateCreated: this.ngayTaoOriginal,
      };

      this.categoryService.updateCategory(this.categoryId, updatedCategory).subscribe({
        next: () => {
          console.log('Cập nhật danh mục thành công');
          this.snackBar.open('Sửa danh mục thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/san-pham/danh-sach-danh-muc']);
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

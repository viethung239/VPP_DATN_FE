import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { GroupCategoryService } from '../../../../services/group-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  CategoryGroup: any[] =[];
  CategoryForm: FormGroup;

  constructor(private fb: FormBuilder, private groupCategoryService: GroupCategoryService,
    private categoryService : CategoryService,
    private router: Router, private snackBar: MatSnackBar) {

    this.CategoryForm = this.fb.group({


      categoryGroupId: ['', Validators.required],
      categoryName: ['', Validators.required],
      categoryImg: ['', Validators.required],
      isActive: ['true', Validators.required],
      dateCreated: [this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });
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
  }
  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    this.CategoryForm.patchValue({
      categoryImg: fileName
    });
  }

  onSubmit() {
    console.log('danh mục trước khi đươc gửi đi',this.CategoryForm);
    if (this.CategoryForm.valid) {

      const newCategory = this.CategoryForm.value;

      this.categoryService.addCategory(newCategory).subscribe({
        next: () => {

          console.log('Thêm danh mục thành công');
          this.snackBar.open('Thêm danh mục thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/san-pham/danh-sach-danh-muc']);
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
    }
  }
}

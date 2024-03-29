import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupCategoryService } from '../../../../services/group-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListGroupCategoryComponent } from '../list-group-category/list-group-category.component';

@Component({
  selector: 'app-edit-group-category',
  templateUrl: './edit-group-category.component.html',
  styleUrl: './edit-group-category.component.scss'
})
export class EditGroupCategoryComponent {
  CategoryGroupForm!: FormGroup;
  categoryGroupId: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoryGroupId: string },
    private fb: FormBuilder,
    private groupCategoryService: GroupCategoryService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ListGroupCategoryComponent>) {

    this.categoryGroupId = data.categoryGroupId;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {


    this.CategoryGroupForm = this.fb.group({

    categoryGroupId: this.categoryGroupId,
    categoryGroupName: ['', Validators.required],
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
    if (this.categoryGroupId !== null) {
      this.groupCategoryService.getCategoryGrouptById(this.categoryGroupId).subscribe({
        next: (cgData) => {
          if (cgData) {
            this.ngayTaoOriginal = cgData.dateCreated;
            this.CategoryGroupForm.patchValue({
              categoryGroupName: cgData.categoryGroupName,
              isActive: cgData.isActive,
            });
          } else {
            console.error('Không tìm thấy nhóm danh mục với id:', this.categoryGroupId);
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
    if (this. CategoryGroupForm.valid && this.categoryGroupId !== null) {
      const updatedCG = {
        ...this.CategoryGroupForm.value,
        dateCreated: this.ngayTaoOriginal,
      };

      this.groupCategoryService.updateCategoryGroup(this.categoryGroupId, updatedCG).subscribe({
        next: () => {
          console.log('Cập nhật nhóm danh mục thành công');
          this.snackBar.open('Sửa nhóm danh mục thành công', 'Đóng', {
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

import { Component } from '@angular/core';
import { ListGroupCategoryComponent } from '../list-group-category/list-group-category.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupCategoryService } from '../../../../services/group-category.service';

@Component({
  selector: 'app-add-group-category',
  templateUrl: './add-group-category.component.html',
  styleUrl: './add-group-category.component.scss'
})
export class AddGroupCategoryComponent {
  CategoryGroupForm: FormGroup;

  constructor(

    private dialogRef: MatDialogRef<ListGroupCategoryComponent>,
    private groupCategoryService: GroupCategoryService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    ) {


    this.CategoryGroupForm = this.fb.group({

    categoryGroupName: ['', Validators.required],
    isActive: ['true', Validators.required],
    dateCreated:[this.getCurrentDateTime(), Validators.required],
    dateUpdated: [this.getCurrentDateTime(), Validators.required],
   });

  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  ngOnInit(): void {

  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.CategoryGroupForm.valid) {
      const newCG = this.CategoryGroupForm.value;
      this.groupCategoryService.addCategoryGroup(newCG).subscribe({
        next: () => {

          console.log('Thêm nhóm danh mục thành công');
          this.snackBar.open('Thêm nhóm danh mục thành công', 'Đóng', {
            duration: 3000,
          });
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error adding category group:', error);
        }
      });
    }
  }
}

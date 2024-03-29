import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListRoleComponent } from '../list-role/list-role.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {
  RoleForm: FormGroup;


  constructor(

    private dialogRef: MatDialogRef<ListRoleComponent>, private roleService : RoleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    ) {


    this.RoleForm = this.fb.group({

    roleName: ['', Validators.required],
    roleDescription: ['', Validators.required],
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
    if (this.RoleForm.valid) {
      const newRole = this.RoleForm.value;
      this.roleService.addRole(newRole).subscribe({
        next: () => {

          console.log('Thêm quyền thành công');
          this.snackBar.open('Thêm quyền thành công', 'Đóng', {
            duration: 3000,
          });
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error adding role:', error);
        }
      });
    }
  }
}

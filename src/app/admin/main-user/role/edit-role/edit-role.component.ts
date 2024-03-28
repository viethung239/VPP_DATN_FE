import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoleService } from '../../../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListRoleComponent } from '../list-role/list-role.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent {
  RoleForm!: FormGroup;
  roleId: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roleId: string },
    private fb: FormBuilder,  private roleService: RoleService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ListRoleComponent>) {
    this.roleId = data.roleId;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {


    this.RoleForm = this.fb.group({

    roleId: this.roleId,
    roleName: ['', Validators.required],
    roleDescription: ['', Validators.required],
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
    if (this.roleId !== null) {
      this.roleService.getRoleById(this.roleId).subscribe({
        next: (roleData) => {
          if (roleData) {
            this.ngayTaoOriginal = roleData.dateCreated;
            this.RoleForm.patchValue({
              roleName: roleData.roleName,
              roleDescription: roleData.roleDescription,
              isActive: roleData.isActive,
            });
          } else {
            console.error('Không tìm thấy quyền với id:', this.roleId);
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
    if (this.RoleForm.valid && this.roleId !== null) {
      const updatedRole = {
        ...this.RoleForm.value,
        dateCreated: this.ngayTaoOriginal,
      };

      this.roleService.updateRole(this.roleId, updatedRole).subscribe({
        next: () => {
          console.log('Cập nhật quyền thành công');
          this.snackBar.open('Sửa quyền thành công', 'Đóng', {
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

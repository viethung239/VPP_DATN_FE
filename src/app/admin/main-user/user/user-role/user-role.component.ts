import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../../services/role.service';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent {


  UserRoleForm: FormGroup;
  Role: any[] =[];
  selectedProductPrice: number | undefined;
  @Output() selectionConfirmed = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserRoleComponent>, private roleService : RoleService,

    private fb: FormBuilder
    ) {


    this.UserRoleForm = this.fb.group({

      userId:[data.userId, Validators.required],
      roleId: ['', Validators.required],
   });

  }
  ngOnInit(): void {
    this.roleService.getListRole().subscribe({
      next: (data: any) => {
        this.Role = data;
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy dữ liệu quyền:', error);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmSelection(): void {
    if (this.UserRoleForm.valid) {
      const listRole = this.UserRoleForm.value;
      console.log('Dữ liệu chuẩn bị gửi:', listRole);
      this.selectionConfirmed.emit(listRole);
      this.closeDialog();
    } else {
      console.error('Data is null or undefined.', this.UserRoleForm);

    }
  }
}

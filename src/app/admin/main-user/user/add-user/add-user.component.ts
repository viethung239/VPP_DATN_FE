import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataVN } from '../../../../dataVN/data-vn';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../../../../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleComponent } from '../user-role/user-role.component';
import { v4 as uuidv4 } from 'uuid';
import { UserRoleService } from '../../../../services/user-role.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  cities: string[] = DataVN.cities;
  districts: string[] = DataVN.districtList;
  communes: string[] = DataVN.comuneList;
  UserForm: FormGroup;
  hide = true;

  userId: string;
  userRole: UserRoles[] = [];
  displayedColumns: string[] = ['roleId','actions'];
  dataSource = new MatTableDataSource<UserRoles>([]);
  Role: any[] =[];
  constructor(private fb: FormBuilder, private userService: UserService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
    private router: Router, private snackBar: MatSnackBar,
    private dialog: MatDialog,) {
    this.userId = ''
    this.UserForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail.com$/)]],
      avartar: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      comune: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      birthDay: ['', Validators.required],
      gender: ['', Validators.required],
      isAdmin:  ['', Validators.required],
      isActive: ['true', Validators.required],
      dateCreated:[this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = uuidv4() ?? 'bị null';
    console.log('userId', this.userId)
    this.roleService.getListRole().subscribe({
      next: (data: any) => {
        this.Role = data;
      },
      error: (error: any) => {
        console.error('Error fetching roles:', error);
      }
    });
  }
  getTenQuyen(roleId: string): string {
    const role = this.Role.find(c => c.roleId === roleId);
    return role ? role.roleName : '';
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
  openDialog(userId: string): void {
    const dialogRef = this.dialog.open(UserRoleComponent, {
      width: '800px',
      height: '300px',
      data: { userId: userId }
    });

    dialogRef.componentInstance.selectionConfirmed.subscribe((result) => {
      console.log('Dữ liệu:', result);
      if (result) {
        this.userRole.push(result);
        this.dataSource.data = this.userRole;

      }
    });

  }
  deleteItem(element: UserRoles): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa quyền này không?')) {

      const index = this.userRole.findIndex(item => item.roleId === element.roleId);
      if (index !== -1) {
        this.userRole.splice(index, 1)
        this.dataSource.data = [...this.userRole];
        this.snackBar.open('Xóa quyền thành công', 'Đóng', { duration: 3000 });

      }
    }
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    this.UserForm.patchValue({
      avartar: fileName
    });
  }
  onSubmit() {
    console.log('onSubmit() function is called');
    if (this.UserForm.valid) {
      const newUser = {
        ...this.UserForm.value,
        userId: this.userId
      };
      console.log('Dữ liệu trước khi gửi', newUser);
      this.userService.addUser(newUser).subscribe({
        next: () => {
          console.log('Thêm người dùng thành công');
          this.snackBar.open('Thêm người dùng thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/nguoi-dung/danh-sach-nguoi-dung']);

          this.sendUserRoles();

        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      });
    }
  }
  sendUserRoles(): void {

    this.userRole.forEach(ListUserRole => {
      this.userRoleService.addUserRole(ListUserRole).subscribe({
        next: () => {

          console.log('Thêm user role thành công');

        },
        error: (error) => {
          console.error('Error adding user role:', error, this.userRole);

        }
      });
    });
  }

}
export interface UserRoles {

  userRoleId: string,
  userId: string,
  roleId: string
}

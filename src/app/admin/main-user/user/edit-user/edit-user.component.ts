import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataVN } from '../../../../dataVN/data-vn';
import { DatePipe } from '@angular/common';
import { UserRoleService } from '../../../../services/user-role.service';
import { RoleService } from '../../../../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleComponent } from '../user-role/user-role.component';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  datePipe: DatePipe = new DatePipe('en-US');

  cities: string[] = DataVN.cities;
  districts: string[] = DataVN.districtList;
  communes: string[] = DataVN.comuneList;
  UserForm!: FormGroup;
  userId: string | null;
  ngayTaoOriginal: string | null = null;
  userNameG: string | null = null;
  passwordG: string | null = null;
  Role: any[] =[];
  displayedColumns: string[] = ['roleId', 'actions'];
  userRoles: UserRoles[] = [];
  isEditClicked: boolean = false;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private userService: UserService,
    private userRoleService: UserRoleService,  private roleService:RoleService,
  private snackBar: MatSnackBar, private router: Router,private dialog: MatDialog,) {
    this.userId = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {
    this.roleService.getListRole().subscribe({
      next: (data: any) => {
        this.Role = data;
      },
      error: (error: any) => {
        console.error('Error fetching roles:', error);
      }
    });
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.UserForm = this.fb.group({

      userId:this.userId,
      email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail.com$/)]],
      avartar: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      comune: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      birthDay: ['', Validators.required],
      gender: ['', Validators.required],
      isAdmin:  ['', Validators.required],
      isActive: ['true', Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });

    this.loadDataForEdit();
    this.getUserRolebyId(this.userId);
  }


  //User
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  formatDate(date: string | null): string {
    if (!date) return '';
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }
  loadDataForEdit(): void {
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe({
        next: (userData) => {
          if (userData) {
            this.ngayTaoOriginal = userData.dateCreated;
            this.userNameG = userData.userName;
            this.passwordG = userData.password;
            this.UserForm.patchValue({
              email: userData.email,
              avartar: userData.avartar,
              fullName: userData.fullName,
              phone: userData.phone,
              address: userData.address,
              comune: userData.comune,
              district: userData.district,
              city: userData.city,
              birthDay: userData.birthDay,
              gender: userData.gender,
              isAdmin: userData.isAdmin,
              isActive: userData.isActive,
            });
          } else {
            console.error('Không tìm thấy người dùng  với id:', this.userId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu với userId là null.');
    }
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);
    this.UserForm.patchValue({
      avartar: fileName
    });
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
  onSubmit() {
    if (!this.userId) {
      console.error('Không thể cập nhật sản phẩm với userId là null.');
      return;
    }

    if (this.UserForm.valid) {
      const updateUser = {
        ...this.UserForm.value,
        dateCreated: this.ngayTaoOriginal,
        userName: this.userNameG,
        password: this.passwordG,
      };

      this.userService.updateUser(this.userId, updateUser).subscribe({
        next: () => {
          console.log('Cập nhật thông tin thành công');
          this.snackBar.open('Sửa thông tin thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/nguoi-dung/danh-sach-nguoi-dung']);
          this.sendUserRoles();
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');

    }
  }

  //UserRoles
  sendUserRoles(): void {

    const newUserRoles = this.userRoles.filter(role => !role.userRoleId);

    newUserRoles.forEach(ListUserRole => {
      this.userRoleService.addUserRole(ListUserRole).subscribe({
        next: () => {
          console.log('Thêm user role thành công');
        },
        error: (error) => {
          console.error('Error adding user role:', error, newUserRoles);
        }
      });
    });
  }
  deleteItem(element: UserRoles): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa quyền này không?')) {
      this.userRoleService.deleteUserRole(String(element.userRoleId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa quyền thành công', 'Đóng', {
            duration: 3000,
          });
          this.userRoles = this.userRoles.filter(role => role !== element);
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
  getUserRolebyId(id: string): void {
    this.userRoleService.getListUserRole().subscribe((data: any[]) => {
      this.userRoles = data.filter(detail => detail.userId === id);
    });
  }
  getTenQuyen(roleId: string): string {
    const role = this.Role.find(c => c.roleId === roleId);
    return role ? role.roleName : '';
  }
  UserRoles(): boolean {
    return this.userRoles.length > 0;
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
        this.userRoles = this.userRoles.filter(role => role.roleId !== result.roleId);
        this.userRoles.push(result);
        this.userRoles = [...this.userRoles];
      }
    });
  }
  toggleEdit() {
    this.isEditClicked = !this.isEditClicked;
  }
}
export interface UserRoles {

  userRoleId: string,
  userId: string,
  roleId: string
}

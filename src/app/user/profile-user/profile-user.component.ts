import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataVN } from '../../dataVN/data-vn';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { DetailCartComponent } from './detail-cart/detail-cart.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {
  @ViewChild('avatarImage') avatarImage!: ElementRef;
  ProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  cities: string[] = DataVN.cities;
  districts: string[] = DataVN.districtList;
  communes: string[] = DataVN.comuneList;
  currentPasswordHide = true;
  newPasswordHide = true;
  confirmPasswordHide = true;
  userId: string | null;
  userData: any;
  userName: string | null;
  password: string | null;
  isAdmin: string | null;
  isActive: string | null;
  dateUpdated: string | null;

  displayedColumns: string[] = ['orderCode', 'status','paymentType', 'dateCreated','actions'];
  dataSource = new MatTableDataSource<OrderData>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.userName = null;
    this.password = null;
    this.isAdmin = null;
    this.isActive = null;
    this.dateUpdated = null;
    this.userId = null;

    this.ProfileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      avartar: ['', Validators.required],
      comune: [''],
      district: [''],
      city: [''],
      gender: [''],
      birthDay: [''],
      dateCreated: ['']
    });
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfoFromToken();
    if (userInfo) {
      this.userId = userInfo.userId;
      this.loadUserData(this.userId!);
      this.getDataOrder(this.userId!);
    } else {
      this.userId = null;
    }
    this.dataSource.paginator = this.paginator;



  }
  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    const reader = new FileReader();
    reader.onload = () => {
      if (this.avatarImage) {
        this.avatarImage.nativeElement.src = reader.result as string;
      }
    };
    reader.readAsDataURL(selectedFile);

    this.ProfileForm.patchValue({
      avartar: fileName
    });
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (userData: any) => {
        this.userData = userData;
        this.userName = userData.userName;
        this.password = userData.password;
        this.isAdmin = userData.isAdmin;
        this.isActive = userData.isActive;
        this.dateUpdated = userData.dateUpdated;
        this.ProfileForm.patchValue({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          comune: userData.comune,
          district: userData.district,
          avartar: userData.avartar,
          city: userData.city,
          gender: userData.gender,
          birthDay: userData.birthDay,
          dateCreated: userData.dateCreated
        });
      },
      error: (error: any) => {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
      }
    });
  }
  onSubmit(): void {
    if (this.ProfileForm.valid) {
        const updatedUserData = {
            ...this.ProfileForm.value,
            userName: this.userName,
            isAdmin: this.isAdmin,
            password: this.password,
            isActive: this.isActive,
            dateUpdated: this.dateUpdated,
        };
        this.userService.updateUser(this.userId!, updatedUserData).subscribe({
            next: () => {
                setTimeout(() => {
                  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['trang-chu/trang-ho-so']);
                      this.snackBar.open('Thông tin đã được cập nhật thành công', 'Đóng');
                  });
              }, 1000);
            },
            error: (error: any) => {
                console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
            }
        });
    } else {
        console.error('Biểu mẫu không hợp lệ.');
    }
  }
  changePassword(): void {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;

    if (newPassword === confirmPassword) {
      if (this.changePasswordForm.valid) {
        const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
        this.authService.changePassword(currentPassword, newPassword).subscribe({
          next: () => {
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['trang-chu/trang-ho-so']);
                this.snackBar.open('Thay đổi mật khẩu thành công', 'Đóng');
              });
            }, 1000);
          },
          error: (error) => {
            console.error('Lỗi khi thay đổi mật khẩu:', error);
            this.changePasswordForm.reset();
            this.snackBar.open('Mật khẩu cũ không đúng. Vui lòng thử lại.', 'Đóng', {
              duration: 3000
            });
          }
        });
      } else {
        console.error('Biểu mẫu thay đổi mật khẩu không hợp lệ.');
      }
    } else {
      console.error('Mật khẩu mới và xác nhận mật khẩu không giống nhau.');
      this.changePasswordForm.reset();
      this.snackBar.open('Mật khẩu mới và xác nhận mật khẩu không giống nhau. Vui lòng thử lại.', 'Đóng', {
        duration: 3000
      });
    }
  }
  getDataOrder(userId: string): void {
    this.orderService.getListOrder().subscribe({
      next: (data) => {
        const filteredData = data.filter((order: OrderData) => order.userId === userId);
        filteredData.sort((a: OrderData, b: OrderData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        this.dataSource.data = filteredData;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getStatus(status: number): string {
    switch (status) {
      case 0:
        return "Đang chuẩn bị";
      case 1:
        return "Đang giao hàng";
      case 2:
        return "Giao hàng thành công";
      case 3:
        return "Đơn hàng đã hủy";
      default:
        return "Không xác định";
    }
  }
  openDialogEdit(orderId :string): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '400px',
      height: '200px',
      data: { orderId: orderId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDataOrder(this.userId!);
    });
  }
  openDialogDetail(orderId :string): void {
    const dialogRef = this.dialog.open(DetailCartComponent, {
      width: '1000px',
      height: 'auto',
      data: { orderId: orderId }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
export interface OrderData {

  orderId: string,
  userId: string,
  totalAmount:string,
  orderCode:string,
  paymentType: string,
  status:string,
  note: string,
  dateCreated:string,
  dateUpdated: string
}

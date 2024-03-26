import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  UserForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private snackBar: MatSnackBar) {

    this.UserForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
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
      dateCreated:[this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });
  }

  ngOnInit(): void {

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
    console.log('người dùng trước khi đươc gửi đi',this.UserForm);
    if (this.UserForm.valid) {

      const newUser = this.UserForm.value;

      this.userService.addUser(newUser).subscribe({
        next: () => {

          console.log('Thêm người dùng thành công');
          this.snackBar.open('Thêm người dùng thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nguoi-dung/danh-sach-nguoi-dung']);
        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      });
    }
  }
}

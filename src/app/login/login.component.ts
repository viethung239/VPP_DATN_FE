import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  jwtHelper = new JwtHelperService();
  userName!: string;
  password!: string;
  fullName!: string;
  email!: string;
  missingCredentials: boolean = false;

  missingRegistrationInfo: boolean = false;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService
    , private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      const signInBtn = document.querySelector("#sign-in-btn");
      const signUpBtn = document.querySelector("#sign-up-btn");
      const container = document.querySelector(".container");

      signInBtn!.addEventListener("click", () => {
        container!.classList.remove("sign-up-mode");
      });

      signUpBtn!.addEventListener("click", () => {
        container!.classList.add("sign-up-mode");
      });
    }
  }
  switchToSignInMode(): void {
    const container = document.querySelector(".container");
    container!.classList.remove("sign-up-mode");
  }
  Login(): void {
    if (!this.userName || !this.password) {
      this.missingCredentials = true;
      return;
    }
    this.authService.Login(this.userName, this.password)
      .pipe(
        catchError(error => {
          console.error('Đăng nhập không thành công', error, { username: this.userName, password: this.password });
          this.snackBar.open('Tên tài khoản hoặc mật khẩu không chính xác', 'Đóng', {
            duration: 3000,
          });

          return new Observable<never>();
        })
      )
      .subscribe(response => {
        const userInfo = this.authService.getUserInfoFromToken();
        if (userInfo && userInfo.isActive === false) {

          this.snackBar.open('Tài khoản của bạn không hoạt động', 'Đóng', {
            duration: 3000,
          });
        } else {
          const token = response.token;
          this.authService.saveToken(token);
          console.log('Đăng nhập thành công', token);
          this.snackBar.open('Đăng nhập thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/trang-chu']);
        }
      });
  }
  Register(): void {
    if (!this.userName || !this.password || !this.fullName || !this.email) {
      this.missingRegistrationInfo = true;
      return;
    }
    this.authService.Register(this.userName, this.password, this.fullName, this.email)
      .subscribe({
        next: response => {
          console.log('Đăng kí thành công', response);
          this.switchToSignInMode();
          this.snackBar.open('Đăng kí thành công', 'Đóng', {
            duration: 3000,
          });

        },
        error: error => {
          console.error('Đăng kí không thành công', error);
          this.snackBar.open('Đăng kí không thành công', 'Đóng', {
            duration: 3000,
          });
        }
      });
}
}

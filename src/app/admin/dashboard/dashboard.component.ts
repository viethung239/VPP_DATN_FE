import { Component, HostListener } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  FullName: string | undefined;
  Role : string | undefined;
  Avatar : string | undefined;
  innerWidth : any;
  constructor(
    private jwtHelper: JwtHelperService,
    private authService:AuthService,
    private userService : UserService,) {

  }
  ngOnInit(): void {

    const userInfo = this.authService.getUserInfoFromToken();
    if (userInfo) {
      const userId = userInfo.userId;
      this.userService.getUserById(userId).subscribe({
        next: (userData: any) => {
          this.FullName = userData.fullName;
          this.Avatar = userData.avartar;
        },
        error: (error: any) => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
      });
    }

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);

        this.Role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        console.log('Token khi dịch', decodedToken);
      }
    }
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(even: any){
    this.innerWidth = window.innerWidth;
  }

  getClass(){
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { UserService } from '../../services/user.service';
import { userItems } from './header-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string | undefined;
  isPopupVisible = false;
  Avatar : string | undefined;
  userItems = userItems;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  constructor( private router: Router, private authService:AuthService,
    private userService : UserService,
    ) {

  }
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
  ngOnInit(): void {
    const userInfo = this.authService.getUserInfoFromToken();
    if (userInfo) {
      const userId = userInfo.userId;
      this.userService.getUserById(userId).subscribe({
        next: (userData: any) => {
          this.userName = userData.userName;
          if (userData.avartar) {
            this.Avatar = userData.avartar;
          } else {

            this.Avatar = 'defaultavatar.jpg';
          }

        },
        error: (error: any) => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
      });
    }
  }
  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }

  logout(): void {
    this.authService.Logout();
    this.router.navigate(['login']);
  }
}

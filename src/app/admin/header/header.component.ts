import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string | undefined;
  isPopupVisible = false;
  AvatarUrl : string | undefined;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  constructor( private router: Router, private authService:AuthService,
    private jwtHelper: JwtHelperService) {

  }
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {

      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        this.AvatarUrl = decodedToken ['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        console.log('Token khi dịch', decodedToken);

      }
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

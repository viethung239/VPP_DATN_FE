import { Component, HostListener } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  TenNV: string | undefined;
  Role : string | undefined;
  Avatar : string | undefined;
  innerWidth : any;
  constructor(
    private jwtHelper: JwtHelperService) {

  }
  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.TenNV = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        this.Role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        this.Avatar = decodedToken ['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/actor']
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

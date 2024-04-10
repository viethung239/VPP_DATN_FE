import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthUserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          const userInfo = this.authService.getUserInfoFromToken();
          if (userInfo && userInfo.isAdmin === false) {
            return true;
          } else {
            return this.router.createUrlTree(['/admin/trang-chu']);
          }
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
};

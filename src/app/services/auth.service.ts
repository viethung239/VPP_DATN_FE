import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, tap } from 'rxjs';
import { navbarData } from '../admin/sidenav/nav-data';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  Login(username: string, password: string): Observable<any>{
    return this.http.post<any>('https://localhost:7287/api/Auth/dang-nhap', { username, password })
      .pipe(
        tap(response => {
          if (this.isLocalStorageAvailable() && response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }
  Register(userName: string, password: string, fullName: string, email: string): Observable<any> {
    return this.http.post<any>('https://localhost:7287/api/Auth/dang-ky', { userName, password, fullName, email })
      .pipe(
        tap(response => {

        })
      );
  }
  isAuthenticated(): Observable<boolean> {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      const isAuthenticated = token ? !this.jwtHelper.isTokenExpired(token) : false;
      return of(isAuthenticated);
    }
    return of(false);
  }


   sendProtectedRequestGet(url: string): Observable<any> {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(url, { headers });
    }
    else {

      return new Observable();
    }
  }

  sendProtectedRequestDelete(url: string): Observable<any> {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<any>(url, { headers });
    } else {

      return new Observable();
    }
  }
  sendProtectedRequestPut(url: string, updatedData: any): Observable<any> {

    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(url, updatedData, { headers });
    } else {

      return new Observable();
    }
  }
  sendProtectedRequestPost(url: string, addData: any): Observable<any> {

    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(url, addData, { headers });
    } else {

      return new Observable();
    }
  }
  sendProtectedRequestGetById(url: string): Observable<any> {

    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(url, { headers });
    } else {

      return new Observable();
    }
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  Logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
    }
  }
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const changePasswordDto = { currentPassword, newPassword };
    const url = 'https://localhost:7287/api/Auth/doi-mat-khau';
    return this.sendProtectedRequestPost(url, changePasswordDto);
  }

  getRolesFromToken(): string[] {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
      }
    }
    return [];
  }
  filterNavigationData(): any[] {
    const userRoles = this.getRolesFromToken();
    return navbarData.filter(item => {
      return !item.roles || item.roles.some(role => userRoles.includes(role));

    });
  }
  getToken(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem('token') : null;
  }
  getUserInfoFromToken(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return {
        userId: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/dsa'],
        roles: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        isAdmin: decodedToken['http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'] === 'True',
        isActive: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dns'] === 'True'? true : false,
        decodedToken: decodedToken
      };
    }
    return null;
  }

}

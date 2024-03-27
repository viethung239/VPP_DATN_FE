import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor( private authService: AuthService) {

  }
  getListUserRole(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/UserRole')

  }
  deleteUserRole(userRoleId: string): Observable<any> {
    const url = `https://localhost:7287/api/UserRole/${userRoleId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateUserRole(userRoleId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/UserRole/`+ userRoleId;
    console.log('Cập nhật với userRoleId:', userRoleId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addUserRole(newUserRoleData: any): Observable<any> {
    const url = 'https://localhost:7287/api/UserRole';
    return this.authService.sendProtectedRequestPost(url, newUserRoleData);
  }
  getUserRoleById(userRoleId: string): Observable<any> {
    const url = `https://localhost:7287/api/UserRole/${userRoleId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }

}

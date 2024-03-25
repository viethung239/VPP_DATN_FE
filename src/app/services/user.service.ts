import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private authService: AuthService) {

  }
  getListUser(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/User')

  }
  deleteUser(userId: string): Observable<any> {
    const url = `https://localhost:7287/api/User/${userId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateUser(userId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/User/`+ userId;
    console.log('Cập nhật với userId:', userId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addUser(newUserData: any): Observable<any> {
    const url = 'https://localhost:7287/api/User';
    return this.authService.sendProtectedRequestPost(url, newUserData);
  }
  getUserById(userId: string): Observable<any> {
    const url = `https://localhost:7287/api/User/${userId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

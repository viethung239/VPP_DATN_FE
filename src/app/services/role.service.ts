import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor( private authService: AuthService) {

  }
  getListRole(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/Role')

  }
  deleteRole(roleId: string): Observable<any> {
    const url = `https://localhost:7287/api/Role/${roleId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateRole(roleId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/Role/`+ roleId;
    console.log('Cập nhật với roleId:', roleId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addRole(newRoleData: any): Observable<any> {
    const url = 'https://localhost:7287/api/Role';
    return this.authService.sendProtectedRequestPost(url, newRoleData);
  }
  getRoleById(roleId: string): Observable<any> {
    const url = `https://localhost:7287/api/Role/${roleId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

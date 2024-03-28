import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupCategoryService {

  constructor( private authService: AuthService) {

  }
  getListCategoryGroup(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/CategoryGroup')

  }
  deleteCategoryGroup(categoryGroupId: string): Observable<any> {
    const url = `https://localhost:7287/api/CategoryGroup/${categoryGroupId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateCategoryGroup(categoryGroupId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/CategoryGroup/`+ categoryGroupId;
    console.log('Cập nhật với categoryGroupId:', categoryGroupId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addCategoryGroup(newCategoryGroupData: any): Observable<any> {
    const url = 'https://localhost:7287/api/CategoryGroup';
    return this.authService.sendProtectedRequestPost(url, newCategoryGroupData);
  }
  getCategoryGrouptById(categoryGroupId: string): Observable<any> {
    const url = `https://localhost:7287/api/CategoryGroup/${categoryGroupId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

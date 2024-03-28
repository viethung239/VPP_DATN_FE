import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private authService: AuthService) {

  }
  getListCategory(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/Category')

  }
  deleteCategory(categoryId: string): Observable<any> {
    const url = `https://localhost:7287/api/Category/${categoryId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateCategory(categoryId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/Category/`+ categoryId;
    console.log('Cập nhật với categoryId:', categoryId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addCategory(newCategoryData: any): Observable<any> {
    const url = 'https://localhost:7287/api/Category';
    return this.authService.sendProtectedRequestPost(url, newCategoryData);
  }
  getCategoryById(categoryId: string): Observable<any> {
    const url = `https://localhost:7287/api/Category/${categoryId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

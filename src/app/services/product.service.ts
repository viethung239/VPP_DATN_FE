import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private authService: AuthService) {

  }
  getListProduct(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/Product')

  }
  deleteProduct(productId: string): Observable<any> {
    const url = `https://localhost:7287/api/Product/${productId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateProduct(productId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/Product/`+ productId;
    console.log('Cập nhật với productId:', productId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addProduct(newProductData: any): Observable<any> {
    const url = 'https://localhost:7287/api/Product';
    return this.authService.sendProtectedRequestPost(url, newProductData);
  }
  getProductById(productId: string): Observable<any> {
    const url = `https://localhost:7287/api/Product/${productId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private authService: AuthService) {

  }
  getListOrder(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/Order')

  }
  deleteOrder(orderId: string): Observable<any> {
    const url = `https://localhost:7287/api/Order/${orderId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateOrder(orderId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/Order/`+ orderId;
    console.log('Cập nhật với orderId:', orderId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addOrder(newOrderData: any): Observable<any> {
    const url = 'https://localhost:7287/api/Order';
    return this.authService.sendProtectedRequestPost(url, newOrderData);
  }
  getOrderById(orderId: string): Observable<any> {
    const url = `https://localhost:7287/api/Order/${orderId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

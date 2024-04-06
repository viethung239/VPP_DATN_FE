import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  constructor( private authService: AuthService) {

  }
  getListOrderDetail(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/OrderDetail')

  }
  deleteOrderDetail(orderDetailId: string): Observable<any> {
    const url = `https://localhost:7287/api/OrderDetail/${orderDetailId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateOrderDetail(orderDetailId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/OrderDetail/`+ orderDetailId;
    console.log('Cập nhật với orderDetailId:', orderDetailId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addOrderDetail(newOrderDetailData: any): Observable<any> {
    const url = 'https://localhost:7287/api/OrderDetail';
    return this.authService.sendProtectedRequestPost(url, newOrderDetailData);
  }
  getOrderDetailById(orderDetailId: string): Observable<any> {
    const url = `https://localhost:7287/api/OrderDetail/${orderDetailId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

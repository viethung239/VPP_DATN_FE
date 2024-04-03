import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WareHouseDetailsService {

  constructor( private authService: AuthService) {

  }
  getListWareHouseDetail(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/WareHouseDetail')

  }
  deleteWareHouseDetail(wareHouseDetailId: string): Observable<any> {
    const url = `https://localhost:7287/api/WareHouseDetail/${wareHouseDetailId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateWareHouseDetail(wareHouseDetailId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/WareHouseDetail/`+ wareHouseDetailId;
    console.log('Cập nhật với WareHouseDetail:', wareHouseDetailId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addWareHouseDetail(newWareHouseDetailData: any): Observable<any> {
    const url = 'https://localhost:7287/api/WareHouseDetail';
    return this.authService.sendProtectedRequestPost(url, newWareHouseDetailData);
  }
  getWareHouseDetailById(wareHouseDetailId: string): Observable<any> {
    const url = `https://localhost:7287/api/WareHouseDetail/${wareHouseDetailId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

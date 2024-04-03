import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WareHouseService {

  constructor( private authService: AuthService) {

  }
  getListWareHouse(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/WareHouse')

  }
  deleteWareHouse(wareHouseId: string): Observable<any> {
    const url = `https://localhost:7287/api/WareHouse/${wareHouseId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateWareHouse(wareHouseId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/WareHouse/`+ wareHouseId;
    console.log('Cập nhật với WareHouse:', wareHouseId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addWareHouse(newWareHouseData: any): Observable<any> {
    const url = 'https://localhost:7287/api/WareHouse';
    return this.authService.sendProtectedRequestPost(url, newWareHouseData);
  }
  getWareHouseById(wareHouseId: string): Observable<any> {
    const url = `https://localhost:7287/api/WareHouse/${wareHouseId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

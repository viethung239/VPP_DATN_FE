import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor( private authService: AuthService) {

  }
  getListSupplier(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/CompanySupplier')

  }
  deleteSupplier(supplierId: string): Observable<any> {
    const url = `https://localhost:7287/api/CompanySupplier/${supplierId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updateSupplier(supplierId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/CompanySupplier/`+ supplierId;
    console.log('Cập nhật với supplierId:', supplierId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addSupplier(newSupplierData: any): Observable<any> {
    const url = 'https://localhost:7287/api/CompanySupplier';
    return this.authService.sendProtectedRequestPost(url, newSupplierData);
  }
  getSupplierById(supplierId: string): Observable<any> {
    const url = `https://localhost:7287/api/CompanySupplier/${supplierId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}

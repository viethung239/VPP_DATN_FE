import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from '../../../../services/supplier.service';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrl: './list-supplier.component.scss'
})
export class ListSupplierComponent {

  displayedColumns: string[] = ['stt', 'supplierName', 'phone','email','isActive', 'dateCreated','dateUpdated','actions'];
  searchKeyword: string = '';
  dataSource = new MatTableDataSource<SupplierData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private supplierService: SupplierService,

    private snackBar: MatSnackBar,

    ) { }

  ngAfterViewInit() {


    this.dataSource.paginator = this.paginator;


    this.getDataSupplier();
  }

  getDataSupplier(): void {
    this.supplierService.getListSupplier().subscribe({
      next: (data) => {
        data.sort((a: SupplierData, b: SupplierData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: SupplierData, b: SupplierData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: SupplierData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
      this.supplierService.deleteSupplier(String(element.supplierId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa nhà cung cấp thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataSupplier();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}
export interface SupplierData {

  supplierId: string,
  supplierName: string,
  phone: string,
  address: string,
  comune: string,
  district: string,
  city: string,
  email: string,
  isActive: string,
  dateCreated: string,
  dateUpdated: string
}

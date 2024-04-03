import { Component, ViewChild } from '@angular/core';
import { WareHouseService } from '../../../../services/ware-house.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-ware-house',
  templateUrl: './list-ware-house.component.html',
  styleUrl: './list-ware-house.component.scss'
})
export class ListWareHouseComponent {
  displayedColumns: string[] = ['stt', 'wareHouseName','isActive','dateCreated', 'dateUpdated','actions'];

  dataSource = new MatTableDataSource<WareHouseData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private wareHouseService:  WareHouseService, private snackBar: MatSnackBar,
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataWareHouse();
  }
  getDataWareHouse(): void {
    this.wareHouseService.getListWareHouse().subscribe({
      next: (data) => {
        data.sort((a: WareHouseData, b: WareHouseData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: WareHouseData, b: WareHouseData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());

        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: WareHouseData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa kho dùng này không?')) {
      this.wareHouseService.deleteWareHouse(String(element.wareHouseId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa kho thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataWareHouse();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface WareHouseData {

  wareHouseId: string,
  wareHouseName: string,
  isActive: string,
  dateCreated: string,
  dateUpdated: string
}

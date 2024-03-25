import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
  displayedColumns: string[] = ['stt', 'userName', 'email','phone','avartar','dateCreated', 'dateUpdated','actions'];

  dataSource = new MatTableDataSource<UserData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private snackBar: MatSnackBar,
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataUser();
  }
  getDataUser(): void {
    this.userService.getListUser().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: UserData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      this.userService.deleteUser(String(element.userId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa người dùng thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataUser();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface UserData {

  userId: string,
  userName: string,
  password: string,
  email: string,
  avartar: string,
  fullName: string,
  phone: string,
  address: string,
  comune: string,
  district: string,
  city:string,
  birthDay: string,
  gender: string,
  isAdmin: string,
  isActive: string,
  dateCreated: string,
  dateUpdated: string
}

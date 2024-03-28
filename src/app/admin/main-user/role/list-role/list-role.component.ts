import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../../../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddRoleComponent } from '../add-role/add-role.component';
import { MatDialog } from '@angular/material/dialog';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.scss'
})
export class ListRoleComponent {

  roleId: string | undefined;
  displayedColumns: string[] = ['stt', 'roleName','roleDescription', 'isActive', 'dateCreated','dateUpdated','actions'];
  dataSource = new MatTableDataSource<RoleData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roleService: RoleService, private snackBar: MatSnackBar,
    private dialog: MatDialog,
   ) {  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataRole();
  }

  getDataRole(): void {
    this.roleService.getListRole().subscribe({
      next: (data) => {

        data.sort((a: RoleData, b: RoleData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: RoleData, b: RoleData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());

        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '800px',
      height: '330px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDataRole();
    });
  }
  openDialogEdit(roleId :string): void {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '800px',
      height: '330px',
      data: { roleId: roleId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDataRole();
    });
  }
  deleteItem(element: RoleData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa quyền này không?')) {
      this.roleService.deleteRole(String(element.roleId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa quyền thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataRole();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface RoleData {

  roleId: string,
  roleName: string,
  roleDescription: string,
  isActive:string,
  dateCreated: string,
  dateUpdated: string
}

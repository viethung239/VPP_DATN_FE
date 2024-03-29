import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GroupCategoryService } from '../../../../services/group-category.service';
import { AddCategoryComponent } from '../../category/add-category/add-category.component';
import { AddGroupCategoryComponent } from '../add-group-category/add-group-category.component';
import { EditGroupCategoryComponent } from '../edit-group-category/edit-group-category.component';

@Component({
  selector: 'app-list-group-category',
  templateUrl: './list-group-category.component.html',
  styleUrl: './list-group-category.component.scss'
})
export class ListGroupCategoryComponent {

  categoryGroupId: string | undefined;
  displayedColumns: string[] = ['stt', 'categoryGroupName', 'isActive', 'dateCreated','dateUpdated','actions'];
  dataSource = new MatTableDataSource<CategoryGroupData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private groupCategoryService: GroupCategoryService, private snackBar: MatSnackBar,
    private dialog: MatDialog,
   ) {  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataCategoryGroup();
  }

  getDataCategoryGroup(): void {
    this.groupCategoryService.getListCategoryGroup().subscribe({
      next: (data) => {

        data.sort((a: CategoryGroupData, b: CategoryGroupData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: CategoryGroupData, b: CategoryGroupData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());

        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddGroupCategoryComponent, {
      width: '800px',
      height: '200px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDataCategoryGroup();
    });
  }
  openDialogEdit(categoryGroupId :string): void {
    const dialogRef = this.dialog.open(EditGroupCategoryComponent, {
      width: '800px',
      height: '200px',
      data: { categoryGroupId: categoryGroupId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDataCategoryGroup();
    });
  }
  deleteItem(element: CategoryGroupData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa nhóm danh mục này không?')) {
      this.groupCategoryService.deleteCategoryGroup(String(element.categoryGroupId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa nhóm danh mục thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataCategoryGroup();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}

export interface CategoryGroupData {



  categoryGroupId:  string,
  categoryGroupName:  string,
  isActive: string,
  dateCreated:  string,
  dateUpdated: string
}

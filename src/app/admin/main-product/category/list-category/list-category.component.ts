import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GroupCategoryService } from '../../../../services/group-category.service';
import { CategoryService } from '../../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryGroupData } from '../../group-category/list-group-category/list-group-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {
  CategoryGroup: CategoryGroupData[] = [];
  displayedColumns: string[] = ['stt', 'categoryGroupId', 'categoryName', 'isActive','dateCreated','dateUpdated','actions'];
  searchKeyword: string = '';
  dataSource = new MatTableDataSource<CategoryData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor( private groupCategoryService: GroupCategoryService,
    private categoryService : CategoryService,
    private snackBar: MatSnackBar,

    ) { }

  ngAfterViewInit() {

    this.groupCategoryService.getListCategoryGroup().subscribe({
      next: (data: any) => {
        this.CategoryGroup = data;

      },
      error: (error: any) => {
        console.error('Error fetching category group:', error);
      }
    });

    this.dataSource.paginator = this.paginator;


    this.getDataCategory();
  }
  getTenNhomDanhMuc(categoryGroupId: string): string {
    const categoryg = this.CategoryGroup.find(c => c.categoryGroupId === categoryGroupId);
    return categoryg ? categoryg.categoryGroupName : 'Không có nhóm danh mục';
  }
  getDataCategory(): void {
    this.categoryService.getListCategory().subscribe({
      next: (data) => {
        data.sort((a: CategoryData, b: CategoryData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: CategoryData, b: CategoryData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: CategoryData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      this.categoryService.deleteCategory(String(element.categoryId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa danh mục thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataCategory();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}
export interface CategoryData {


  categoryId: string,
  categoryGroupId:  string,
  categoryName:  string,
  isActive: string,
  dateCreated:  string,
  dateUpdated: string
}

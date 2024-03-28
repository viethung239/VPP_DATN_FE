import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../../services/category.service';
import { CategoryData } from '../../category/list-category/list-category.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {
  Category: CategoryData[] = [];
  displayedColumns: string[] = ['stt', 'categoryId', 'productName','productPrice','productImage', 'dateCreated','dateUpdated','actions'];
  searchKeyword: string = '';
  dataSource = new MatTableDataSource<ProductData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private productService: ProductService,
    private categoryService:CategoryService,
    private snackBar: MatSnackBar,

    ) { }

  ngAfterViewInit() {

    this.categoryService.getListCategory().subscribe({
      next: (data: any) => {
        this.Category = data;

      },
      error: (error: any) => {
        console.error('Error fetching branch:', error);
      }
    });

    this.dataSource.paginator = this.paginator;


    this.getDataProduct();
  }
  getTenDanhMuc(categoryId: string): string {
    const category = this.Category.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }
  getDataProduct(): void {
    this.productService.getListProduct().subscribe({
      next: (data) => {
        data.sort((a: ProductData, b: ProductData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: ProductData, b: ProductData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: ProductData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(String(element.productId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataProduct();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}
export interface ProductData {

  productId: string,
  categoryId: string,
  productName: string,
  productPrice: string,
  sDescription: string,
  lDescription: string,
  productImage: string,
  isActive: string,
  dateCreated: string,
  dateUpdated: string
}

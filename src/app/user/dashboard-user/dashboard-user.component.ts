import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { GroupCategoryService } from '../../services/group-category.service';
import { ProductData } from '../../admin/main-product/product/list-product/list-product.component';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent  {

  Category: any[] =[];

  ProductisNew: any[] = [];
  ProductisHot: any[] =[];
  Product: any[] = [];
  p: number = 1;
  itemsPerPage: number = 8;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,

  ) { }

  ngOnInit(): void {

    this.categoryService.getListCategory().subscribe({
      next: (data: any) => {
        this.Category = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });

    this.getDataProduct();
  }

  getTenDanhMuc(categoryId: string): string {
    const category = this.Category.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }
  getDataProduct(): void {
    this.productService.getListProduct().subscribe({
      next: (data) => {
        this.ProductisHot = data.filter((product: ProductData) => product.isHot === true);

        data.sort((a: ProductData, b: ProductData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        this.ProductisNew = data.slice(0, 8);

        this.Product = data
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}

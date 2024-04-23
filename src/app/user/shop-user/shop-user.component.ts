import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-shop-user',
  templateUrl: './shop-user.component.html',
  styleUrl: './shop-user.component.scss'
})
export class ShopUserComponent {
  Category: any[] =[];


  Product: any[] = [];
  p: number = 1;
  itemsPerPage: number = 12;

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

        this.Product = data
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

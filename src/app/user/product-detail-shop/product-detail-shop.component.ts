import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductData } from '../../admin/main-product/product/list-product/list-product.component';

@Component({
  selector: 'app-product-detail-shop',
  templateUrl: './product-detail-shop.component.html',
  styleUrl: './product-detail-shop.component.scss'
})
export class ProductDetailShopComponent {
  Category: any[] =[];
  productId: string | null;
  product: any;
  ProductisHot: any[] = [];
  p: number = 1;
  itemsPerPage: number = 4;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService : CategoryService ) {
    this.productId = null;

  }
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
    this.productId = this.route.snapshot.paramMap.get('id')!;


    this.getProductDetail(this.productId);

  }
  getTenDanhMuc(categoryId: string): string {
    const category = this.Category.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }
  getProductDetail(id: string): void {
    this.productService.getProductById(id).subscribe((data: any) => {
      this.product = data;
    });
  }
  getDataProduct(): void {
    this.productService.getListProduct().subscribe({
      next: (data) => {
        this.ProductisHot = data.filter((product: ProductData) => product.isHot === true);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

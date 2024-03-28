import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  Category: any[] =[];
  productId: string | null;
  product: any;

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
    this.productId = this.route.snapshot.paramMap.get('id')!;

    this.getProductDetail(this.productId);
  }

  getProductDetail(id: string): void {
    this.productService.getProductById(id).subscribe((data: any) => {
      this.product = data;
    });
  }
}

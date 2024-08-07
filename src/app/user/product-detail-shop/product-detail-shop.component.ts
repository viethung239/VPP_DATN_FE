import { WareHouseDetailsService } from './../../services/ware-house-details.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductData } from '../../admin/main-product/product/list-product/list-product.component';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

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
  productWarehouses: any[] = [];
  p: number = 1;
  itemsPerPage: number = 4;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService : CategoryService,
    private authService: AuthService,
    private wareHouseDetailsService :  WareHouseDetailsService,
    private cartService: CartService ,
    private router: Router,
    private snackBar: MatSnackBar) {
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
      this.getWareHouseDetails();
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
  getWareHouseDetails(): void {
    this.wareHouseDetailsService.getListWareHouseDetail()
      .subscribe((warehouses: any) => {
        this.productWarehouses = warehouses.filter((warehouse: any) => warehouse.productId === this.product.productId);
      });
  }

  getQuantityByWarehouse(): number {
    let totalQuantity = 0;
    this.productWarehouses.forEach((warehouse: any) => {
      totalQuantity += warehouse.quantity;
    });
    return totalQuantity;
  }
  // addToCart(quantity:number) {
  //   const cartItem = {
  //     product: this.product,
  //     quantity: quantity
  //   };
  //   this.cartService.addToCart(cartItem);
  //   this.snackBar.open('Thêm vào giỏ hàng thành công', 'Đóng', {
  //     duration: 3000,
  //   });

  // }
  addToCart(quantity: number): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        const cartItem = {
          product: this.product,
          quantity: quantity
        };
        this.cartService.addToCart(cartItem);
        this.snackBar.open('Thêm vào giỏ hàng thành công', 'Đóng', {
          duration: 3000,
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}

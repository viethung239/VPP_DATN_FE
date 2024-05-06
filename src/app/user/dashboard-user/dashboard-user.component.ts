import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductData } from '../../admin/main-product/product/list-product/list-product.component';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { PostData } from '../../admin/main-post/post/list-post/list-post.component';




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

  User: any[] = [];
  PostisNew: any[] = [];
  PostisHot: any[] = [];
  Post: any[] = [];
  a:number =1;
  p: number = 1;
  itemsProduct: number = 8;
  itemsPost: number = 3;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService,
    private postService: PostService

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
    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
    this.getDataProduct();
    this.getDataPost();
  }

  getTenDanhMuc(categoryId: string): string {
    const category = this.Category.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }
  getTenTacGia(userId: string):string{
    const user = this.User.find(u => u.userId === userId);
    return user ? user.fullName : '';
  }
  getAnhTacGia(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    const imgUrl = user ? user.avartar : '';
    return imgUrl ? 'assets/users/' + imgUrl : '';
  }
  getDataProduct(): void {
    this.productService.getListProduct().subscribe({
      next: (data) => {

      const activeProducts = data.filter((product: ProductData) => product.isActive === true);

      activeProducts.sort((a: ProductData, b: ProductData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

      this.ProductisNew = activeProducts.slice(0, 8);

      this.ProductisHot = activeProducts.filter((product: ProductData) => product.isHot === true);

      this.Product = activeProducts;


      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getDataPost(): void {
    this.postService.getListPost().subscribe({
      next: (data) => {

      const activePosts = data.filter((post: PostData) => post.isActive === true);

      activePosts.sort((a: PostData, b: PostData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

      this.PostisNew = activePosts.slice(0, 3);

      this.PostisHot = activePosts.filter((post: PostData) => post.isHot === true);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }



}

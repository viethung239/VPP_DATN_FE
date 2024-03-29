import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ListGroupCategoryComponent } from './group-category/list-group-category/list-group-category.component';


const routes: Routes = [
  {
    path: 'danh-sach-san-pham',
    component: ListProductComponent
  },
  {
    path: 'danh-sach-san-pham/them-san-pham',
    component: AddProductComponent
  },
  {
    path: 'danh-sach-san-pham/sua-san-pham/:id',
    component: EditProductComponent
  },
  {
    path: 'danh-sach-san-pham/chi-tiet-san-pham/:id',
    component: ProductDetailComponent
  },
  {
    path: 'danh-sach-danh-muc',
    component: ListCategoryComponent
  },
  {
    path: 'danh-sach-danh-muc/them-danh-muc',
    component: AddCategoryComponent
  },
  {
    path: 'danh-sach-danh-muc/sua-danh-muc/:id',
    component: EditCategoryComponent
  },

  {
    path: 'danh-sach-nhom-danh-muc',
    component: ListGroupCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainProductRoutingModule { }

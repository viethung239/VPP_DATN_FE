import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainProductRoutingModule { }

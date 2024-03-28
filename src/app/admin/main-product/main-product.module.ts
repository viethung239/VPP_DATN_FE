import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainProductRoutingModule } from './main-product-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [


    ListProductComponent,
         AddProductComponent,
         EditProductComponent,
         ProductDetailComponent,
         ListCategoryComponent
  ],
  imports: [
    CommonModule,
    MainProductRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginator,
    MatCardModule,
  ]
})
export class MainProductModule { }

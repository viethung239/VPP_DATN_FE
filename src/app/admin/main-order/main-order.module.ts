import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainOrderRoutingModule } from './main-order-routing.module';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { MatIconModule } from '@angular/material/icon';
import {  MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { OrderStatusComponent } from './order/order-status/order-status.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';


@NgModule({
  declarations: [
    ListOrderComponent,
    OrderStatusComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    MainOrderRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginator,
  ]
})
export class MainOrderModule { }

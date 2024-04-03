import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWarehouseRoutingModule } from './main-warehouse-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ListWareHouseComponent } from './ware-house/list-ware-house/list-ware-house.component';
import { AddWareHouseComponent } from './ware-house/add-ware-house/add-ware-house.component';
import { ItemWareHouseComponent } from './ware-house/item-ware-house/item-ware-house.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ListWareHouseComponent,
    AddWareHouseComponent,
    ItemWareHouseComponent
  ],
  imports: [
    CommonModule,
    MainWarehouseRoutingModule,
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
export class MainWarehouseModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainUserRoutingModule } from './main-user-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ListUserComponent } from './user/list-user/list-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
      ListUserComponent
  ],
  imports: [
    CommonModule,
    MainUserRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})
export class MainUserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainUserRoutingModule } from './main-user-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

import { ListRoleComponent } from './role/list-role/list-role.component';
import { UserRoleComponent } from './user/user-role/user-role.component';


@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    ListRoleComponent,
    UserRoleComponent,

  ],
  imports: [
    CommonModule,
    MainUserRoutingModule,
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
export class MainUserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSettingRoutingModule } from './main-setting-routing.module';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    UserProfileComponent,


  ],
  imports: [
    CommonModule,
    MainSettingRoutingModule,
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
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ]
})
export class MainSettingModule { }

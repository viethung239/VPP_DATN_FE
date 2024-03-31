import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPostRoutingModule } from './main-post-routing.module';
import { ListPostComponent } from './post/list-post/list-post.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';


@NgModule({
  declarations: [
    ListPostComponent,
    AddPostComponent,
    EditPostComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    MainPostRoutingModule,
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
export class MainPostModule { }

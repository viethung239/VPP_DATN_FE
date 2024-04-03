import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './post/list-post/list-post.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';


const routes: Routes = [

  {
    path: '',
    component: ListPostComponent
  },
  {
    path: 'them-bai-viet',
    component: AddPostComponent
  },
  {
    path: 'sua-bai-viet/:id',
    component: EditPostComponent
  },

  {
    path: 'chi-tiet-bai-viet/:id',
    component: PostDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPostRoutingModule { }

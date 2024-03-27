import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

import { ListRoleComponent } from './role/list-role/list-role.component';

const routes: Routes = [
  {
    path: 'danh-sach-nguoi-dung',
    component: ListUserComponent
  },
  {
    path: 'danh-sach-nguoi-dung/thong-tin-nguoi-dung/:id',
    component: EditUserComponent
  },
  {
    path: 'danh-sach-nguoi-dung/them-nguoi-dung',
    component: AddUserComponent
  },
  {
    path: 'danh-sach-quyen',
    component: ListRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainUserRoutingModule { }

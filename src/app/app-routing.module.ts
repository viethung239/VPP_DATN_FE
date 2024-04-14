import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LayoutUserComponent } from './user/layout-user/layout-user.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { AuthUserGuard } from './auth-user.guard';
import { AuthAdminGuard } from './auth-admin.guard';
import { BlogComponent } from './user/blog/blog.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {
    path:'login', component: LoginComponent
  },
  {
    path: '',
    component: LayoutUserComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: 'trang-chu',
        component: DashboardUserComponent
      },
      {

        path: 'trang-chu/blog',
        component: BlogComponent
      },
    ]
  },
  {
    path: '',
    component: LayoutAdminComponent,
    canActivate: [AuthAdminGuard],
    children: [
      {
        path: 'admin/trang-chu',
        component: DashboardComponent
      },
      {
        path:'admin/nguoi-dung',
        loadChildren:() =>import('./admin/main-user/main-user.module').then(u => u.MainUserModule )
      },
      {
        path:'admin/san-pham',
        loadChildren:() =>import('./admin/main-product/main-product.module').then(u => u.MainProductModule )
      },
      {
        path:'admin/bai-viet',
        loadChildren:() =>import('./admin/main-post/main-post.module').then(u => u.MainPostModule )
      },
      {
        path:'admin/nha-cung-cap',
        loadChildren:() =>import('./admin/main-supplier/supplier.module').then(u => u.SupplierModule )
      },
      {
        path:'admin/kho',
        loadChildren:() =>import('./admin/main-warehouse/main-warehouse.module').then(u => u.MainWarehouseModule )
      },
      {
        path:'admin/don-hang',
        loadChildren:() =>import('./admin/main-order/main-order.module').then(u => u.MainOrderModule )
      },
      {
        path:'admin/cai-dat',
        loadChildren:() =>import('./admin/main-setting/main-setting.module').then(u => u.MainSettingModule )
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

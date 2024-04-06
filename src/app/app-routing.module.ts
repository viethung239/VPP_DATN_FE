import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {
    path:'login', component: LoginComponent
  },
  {
    path: '',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
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

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

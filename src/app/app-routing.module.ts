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

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

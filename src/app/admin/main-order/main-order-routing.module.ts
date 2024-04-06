import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

const routes: Routes = [

  {
    path: 'danh-sach-don-hang',
    component: ListOrderComponent
  },
  {
    path: 'danh-sach-don-hang/chi-tiet-don-hang/:id',
    component: OrderDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainOrderRoutingModule { }

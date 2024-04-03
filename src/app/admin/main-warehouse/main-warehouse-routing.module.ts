import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWareHouseComponent } from './ware-house/list-ware-house/list-ware-house.component';
import { AddWareHouseComponent } from './ware-house/add-ware-house/add-ware-house.component';

const routes: Routes = [
  {
    path: 'danh-sach-kho',
    component: ListWareHouseComponent
  },

  {
    path: 'danh-sach-kho/them-kho',
    component: AddWareHouseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainWarehouseRoutingModule { }

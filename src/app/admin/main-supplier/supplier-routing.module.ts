import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';

const routes: Routes = [
  {
    path: '',
    component: ListSupplierComponent
  },
  {
    path: 'chi-tiet-nha-cung-cap/:id',
    component: EditSupplierComponent
  },
  {
    path: 'them-nha-cung-cap',
    component: AddSupplierComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

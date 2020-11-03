import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplainOrderPage } from './complain-order.page';

const routes: Routes = [
  {
    path: '',
    component: ComplainOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplainOrderPageRoutingModule {}

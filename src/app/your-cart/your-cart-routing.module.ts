import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourCartPage } from './your-cart.page';

const routes: Routes = [
  {
    path: '',
    component: YourCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourCartPageRoutingModule {}

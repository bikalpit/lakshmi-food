import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplainOrderPageRoutingModule } from './complain-order-routing.module';

import { ComplainOrderPage } from './complain-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplainOrderPageRoutingModule
  ],
  declarations: [ComplainOrderPage]
})
export class ComplainOrderPageModule {}

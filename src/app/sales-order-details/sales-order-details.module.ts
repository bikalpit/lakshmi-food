import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderDetailsPageRoutingModule } from './sales-order-details-routing.module';

import { SalesOrderDetailsPage } from './sales-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderDetailsPageRoutingModule
  ],
  declarations: [SalesOrderDetailsPage]
})
export class SalesOrderDetailsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSummaryPageRoutingModule } from './order-summary-routing.module';

import { OrderSummaryPage } from './order-summary.page';
import { Downloader } from '@ionic-native/downloader/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Downloader,
    OrderSummaryPageRoutingModule
  ],
  declarations: [OrderSummaryPage]
})
export class OrderSummaryPageModule {}

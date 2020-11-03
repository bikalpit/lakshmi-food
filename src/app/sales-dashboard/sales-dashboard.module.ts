import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesDashboardPageRoutingModule } from './sales-dashboard-routing.module';

import { SalesDashboardPage } from './sales-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesDashboardPageRoutingModule
  ],
  declarations: [SalesDashboardPage]
})
export class SalesDashboardPageModule {}

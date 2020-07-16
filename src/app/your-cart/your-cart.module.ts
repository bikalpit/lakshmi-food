import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourCartPageRoutingModule } from './your-cart-routing.module';

import { YourCartPage } from './your-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourCartPageRoutingModule
  ],
  declarations: [YourCartPage]
})
export class YourCartPageModule {}

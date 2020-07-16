import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.page.html',
  styleUrls: ['./your-cart.page.scss'],
})
export class YourCartPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  fnProceedToCheckout(){
    this.navCtrl.navigateForward('select-address');

  }
  fnBackToProductList(){
    this.navCtrl.navigateForward('product-list');

  }
}

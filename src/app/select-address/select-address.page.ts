import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  fnAddNewAddress() {
    this.navCtrl.navigateForward('add-address');
  }
  fnProceedToCheckout() {
    this.navCtrl.navigateForward('success-order');
  }
  fnBackToYourCart(){
    this.navCtrl.navigateForward('your-cart');

  }
}

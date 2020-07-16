import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  fnOrderSummary(){
    this.navCtrl.navigateForward('order-summary');

  }

}

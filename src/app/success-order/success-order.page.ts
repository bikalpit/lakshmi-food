import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.page.html',
  styleUrls: ['./success-order.page.scss'],
})
export class SuccessOrderPage implements OnInit {

  OrderNumber:any;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.OrderNumber = localStorage.getItem('OrderNumber');

  }
  fnViewProduct(){
    this.navCtrl.navigateForward('product-list');

  }

}

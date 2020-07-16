import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.page.html',
  styleUrls: ['./cancel-order.page.scss'],
})
export class CancelOrderPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  fnCancelOrder(){
    this.navCtrl.navigateForward('customer-orders');

  }
}

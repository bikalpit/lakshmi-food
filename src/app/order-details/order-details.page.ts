import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  fnCancelOrder(){
    this.navCtrl.navigateForward('my-account');

  }
}

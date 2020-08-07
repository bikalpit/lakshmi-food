import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

 

  constructor(private location: Location,public navCtrl: NavController) {
   }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
  
  fnCancelOrder() {

    this.navCtrl.navigateForward('my-account');

  }

  
}

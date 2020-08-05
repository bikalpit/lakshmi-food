import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {

 
  constructor(public navCtrl: NavController) { 

    
  }

  ngOnInit() {
  }
  fnCancelOrder(){
    this.navCtrl.navigateForward('cancel-order');

  }
  
}

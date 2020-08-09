import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.page.html',
  styleUrls: ['./cancel-order.page.scss'],
})
export class CancelOrderPage implements OnInit {

  id: any;
  requestObject: any;
  dataResponse: any;
  reason:any;
  orderNo:any;

  constructor(private location: Location,private auth: AuthService,private router: Router, public navCtrl: NavController) {

    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.id = state.id;
      this.orderNo = state.orderNo;
      console.log("order id-->", this.id);
      console.log("order id-->", this.orderNo);
    }
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  fnCancelOrder() {
    this.requestObject = {
      "order_id": this.id,
      "cancel_reason" : this.reason
    }
    console.log(this.requestObject);

    this.auth.cancelOrders(this.requestObject).subscribe((data: any) => {
      console.log(data);

    this.auth.showToast('Order cancel succesfully');
     //this.navCtrl.navigateForward('customer-orders');

    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
    //this.navCtrl.navigateForward('customer-orders');

  }
}

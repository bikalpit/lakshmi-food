import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.page.html',
  styleUrls: ['./cancel-order.page.scss'],
})
export class CancelOrderPage implements OnInit {
  id: any;
  orderNum: any;
  reason: any;
  constructor(private router: Router, private location: Location, public navCtrl: NavController, private auth: AuthService) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.id = state.id;
      this.orderNum = ' Order Number : ' + state.order_number;
      console.log("order id-->", this.id);
      console.log("order Number-->", this.orderNum);
    }
  }

  ngOnInit() {
  }
  fnCancelOrder() {
    if ((this.id != null || this.id != undefined || this.id != '') && (this.reason != null || this.reason != undefined || this.reason != '')) {
      let requestObject = {
        "order_id": this.id,
        "cancel_reason": this.reason,
        "cancel_by": "CC"
      }
      console.log(requestObject);
      this.auth.showLoader();
      this.auth.cancelOrder(requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        this.auth.showToast('Your order has been cancelled.');
        console.log("cancel order-->", data);
        this.navCtrl.navigateForward('customer-orders');
      }, (err) => {
        this.auth.hideLoader();
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });
    } else {
      this.auth.showToast('Enter reason!');
    }


  }
  goBack() {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.page.html',
  styleUrls: ['./cancel-order.page.scss'],
})
export class CancelOrderPage implements OnInit {

  ionicForm: FormGroup;
  id: any;
  orderNum: any;
  reason: any;
  constructor( public formbulider: FormBuilder,private router: Router, private location: Location, public navCtrl: NavController, private auth: AuthService) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      console.log(state);
      this.id = state.id;
      this.orderNum = '# Order Number : ' + state.order_number;
    }
    this.ionicForm = this.formbulider.group({
      reason: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }
  
  fnCancelOrder() {

    if (this.ionicForm.value.reason) {

      let requestObject = {
        "order_id": this.id,
        "cancel_reason": this.ionicForm.value.reason,
        "cancel_by": "CC"
      }
      this.auth.showLoader();
      this.auth.cancelOrder(requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        this.auth.showToast('Your order has been cancelled.');
        console.log("cancel order-->", data);
        this.navCtrl.navigateForward('customer-orders');
      }, (err) => {
        this.auth.hideLoader();
        console.log("Error=>", err);
      });

    } else {
      this.auth.showToast('Enter reason!');
    }

  }


  goBack() {
    this.location.back();
  }

}

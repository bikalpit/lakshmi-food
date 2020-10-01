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
  cancel_by:any;
  constructor( public formbulider: FormBuilder,private router: Router, private location: Location, public navCtrl: NavController, private auth: AuthService) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      console.log(state);
      this.id = state.id;
      this.orderNum = '# Order Number : ' + state.order_number;
      this.cancel_by = state.cancel_by;
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
        "cancel_by": this.cancel_by
      }
      this.auth.showLoader();
      this.auth.cancelOrder(requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        this.auth.showToast('Your order has been cancelled.');
        console.log("cancel order-->", data);
        if(this.cancel_by=="CC"){
          this.navCtrl.navigateForward('customer-orders');
        }else{
          this.navCtrl.navigateRoot('/my-account');
        }
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

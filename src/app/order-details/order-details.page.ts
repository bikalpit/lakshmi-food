import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
 

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
  providers: [DatePipe]

})
export class OrderDetailsPage implements OnInit {

  requestObject: any;
  ordersDetails = [];
  orderItem = [];
  dataResponse: any;
  id: any;
  orderDate: any;
  date: any;
  cartData: any;
  mainSubTotal: any;
  user_id: any;
  ordersList = [];
  role:any;
  url:any;
  constructor(  private commonService: CommonService, private router: Router, private datePipe: DatePipe, private auth: AuthService, private location: Location, public navCtrl: NavController) {

    const state = this.router.getCurrentNavigation().extras.state 
    if (state) {
      this.id = state;
      console.log("order id-->", this.id);
    }

    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);
    this.role=localStorage.getItem("role");

  }

  ngOnInit() {
    this.getOrderDetails();
    //this.fnGetCustomerDetails();
    this.url = this.commonService.url();
  }

  goBack() {
    this.location.back();
  } 

  fnCancelOrder(id,order_number,cancel_by) {
   // alert(cancel_by);
    let params = {
      id,
      order_number,
      cancel_by
    }
    console.log(params);
    this.navCtrl.navigateForward('cancel-order',{state : params});

  }

  getOrderDetails() {

    this.requestObject = {
      "order_id": this.id
    }
    console.log(this.requestObject);
    this.auth.showLoader();
    this.auth.getOrderDetails(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.ordersDetails = this.dataResponse;
      this.date = this.dataResponse.create_at;


      this.orderDate = this.datePipe.transform(new Date(this.date), "dd/MM/yyyy");

      console.log("order data-->", this.ordersDetails);

      this.orderItem = this.dataResponse.order_item;
      console.log("order item data-->", this.orderDate);

    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
      this.auth.hideLoader();
    });
  }

  fnCompleted(status){
    console.log(status);
    this.requestObject = {
      "order_id" : this.id,
      "order_status" : status,
      "user_id":this.user_id,
      "user_type":this.role   
    }
    this.auth.showLoader();
    console.log(this.requestObject); 
    this.auth.updateOrderStatus(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.auth.hideLoader();
      this.auth.showToast('Order status updated succesfully');
      this.navCtrl.navigateForward('my-account');

    }, (err) => {
      console.log("Error=>", err);
      this.auth.hideLoader();
    });
  }
  
}

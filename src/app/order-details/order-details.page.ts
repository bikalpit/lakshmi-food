import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


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
  orderDate:any;
  date:any;
  cartData:any;
  mainSubTotal:any;

  constructor( private router: Router,private datePipe: DatePipe,private auth: AuthService,private location: Location,public navCtrl: NavController) {
    
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.id = state;
      console.log("order id-->", this.id);
    }
  
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  goBack() {
    this.location.back();
  }
  
  fnCancelOrder() {

    this.navCtrl.navigateForward('my-account');

  }

  getOrderDetails() {

    this.requestObject = {
      "order_id": this.id
    }
    console.log(this.requestObject);

    this.auth.getOrderDetails(this.requestObject).subscribe((data: any) => {
      console.log(data);

      this.dataResponse = data.data;
      this.ordersDetails = this.dataResponse;
      this.date=this.dataResponse.create_at;
      
    
        this.orderDate = this.datePipe.transform(new Date(this.date), "dd-MM-yyyy");
      
      console.log("order data-->",this.ordersDetails);

      this.orderItem = this.dataResponse.order_item;
      console.log("order list data-->", this.orderDate);

    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

  
}

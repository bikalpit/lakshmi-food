import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { constants } from 'buffer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  providers: [DatePipe]

})
export class OrderSummaryPage implements OnInit {

  requestObject: any;
  ordersDetails = [];
  orderItem = [];
  dataResponse: any;
  id: any;
  orderDate:any;
  date:any;
  cartData:any;
  mainSubTotal:any;
  orderNum:any;

  constructor(private datePipe: DatePipe,private location: Location, private router: Router, private route: ActivatedRoute, public navCtrl: NavController, private auth: AuthService) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.id = state.id;
      this.orderNum=state.order_number;
      console.log("order id-->", this.id); 
     
    }
/*     console.log("cartData -->", localStorage.getItem("cartData")); 
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
    this.mainSubTotal = localStorage.getItem("mainsubtotal"); */
    
  }

  ngOnInit() {
    this.getOrderDetails();
  } 
  goBack() {
    this.location.back();
  }
  fnCancelOrder() {

    this.navCtrl.navigateForward('cancel-order', { state: {id:this.id,order_number:this.orderNum} });

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
      this.date=this.dataResponse.create_at;
      
    
        this.orderDate = this.datePipe.transform(new Date(this.date), "dd-MM-yyyy");
      
      console.log("order data-->",this.ordersDetails);

      this.orderItem = this.dataResponse.order_item;
      console.log("order list data-->", this.orderDate);

    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

}

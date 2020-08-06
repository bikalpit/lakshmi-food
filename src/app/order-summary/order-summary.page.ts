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
  constructor(private datePipe: DatePipe,private location: Location, private router: Router, private route: ActivatedRoute, public navCtrl: NavController, private auth: AuthService) {
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

    this.navCtrl.navigateForward('cancel-order');

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

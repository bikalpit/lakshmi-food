import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
  providers: [DatePipe]

})
export class SummaryPage implements OnInit {

  id: any;
  requestObject: any;
  ordersDetails = [];
  orderItem = [];
  dataResponse: any;
  orderDate: any;
  date: any;
  orderNum: any;

  constructor(
    public navCtrl: NavController,
    private location: Location,
    private datePipe: DatePipe,
    private auth: AuthService,
    private router: Router) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.id = state.id;
      this.orderNum = state.order_number;
      console.log("order id-->", this.id);

    }
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  goBack() {
    this.location.back();

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
      console.log("order list data-->", this.orderDate);

    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }

  fnCancelOrder(id, orderNo) {
    this.navCtrl.navigateForward('cancel-order', { state: { id: this.id, order_number: this.orderNum } });
  }

}

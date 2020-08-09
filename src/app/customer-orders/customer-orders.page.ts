import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
  providers: [DatePipe]
})
export class CustomerOrdersPage implements OnInit {
  requestObject: any;
  user_id: any;
  create_at: any;

  ordersList = [];
  dataResponse: any;
  status: any;
  selecTextStatus = {
    select: null
  };

  constructor(private datePipe: DatePipe,
    public menu: MenuController,
    public navCtrl: NavController,
    private auth: AuthService) {
    this.selecTextStatus.select = "New";
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
    console.log("id-->",this.user_id);
  }
  ionViewDidEnter(){
    this.fngetOrderList(this.selecTextStatus.select);
  }
  ngOnInit() { }
  
  fnOrderSummary(id) {
    this.navCtrl.navigateForward('summary',{state:id});
  }

  OnChange(value) {
    this.status = value;
    console.log(this.status);
    this.fngetOrderList(value);
  }

  fngetOrderList = value => {

    this.requestObject = {

      "order_status": value,
      "user_id": this.user_id
    }
    this.auth.showLoader();
    console.log(this.requestObject);
    this.auth.getOrderList(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.ordersList = this.dataResponse;

      this.ordersList.forEach((element) => {
        element.create_at = this.datePipe.transform(new Date(element.create_at), "dd-MM-yyyy");
      });

      console.log("order list-->", this.ordersList);


    }, (err) => {
      console.log("Error=>", err);
      this.auth.hideLoader();
    });

  }
  fnBackToYourCart() {
    this.navCtrl.navigateForward('dashboard');
  }
}

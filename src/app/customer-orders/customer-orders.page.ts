import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage implements OnInit {
  requestObject: any;
  user_id:any;

  constructor(public navCtrl: NavController, private auth: AuthService) { 

    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

  }

  ngOnInit() {
    this.fngetOrderList();

  }
  fnOrderSummary(){
    this.navCtrl.navigateForward('order-summary');

  }
  OnChange(evnt){
    alert(evnt);
  }
  fngetOrderList() {

    this.requestObject = {

      "order_status" : "New",
      "user_id" : "12"
    }
    console.log(this.requestObject);
    this.auth.getOrderList(this.requestObject).subscribe((data: any) => {
      console.log(data);
     
    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
  providers: [DatePipe]

})
export class MyAccountPage implements OnInit {

  user_id: any;
  ordersList = [];
  dataResponse: any;
  requestObject: any;
  id: any;
  value: any;

  constructor(private datePipe: DatePipe, private auth: AuthService, public navCtrl: NavController, public menu: MenuController) {
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

  }

  ngOnInit() {
    this.requestObject = {
      "delivery_boy_id": this.user_id
    }
    console.log(this.requestObject);
    this.auth.getOrderList(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.dataResponse = data.data;
      this.ordersList = this.dataResponse;

      this.ordersList.forEach((element) => {
        element.create_at = this.datePipe.transform(new Date(element.create_at), "dd-MM-yyyy");
      });

      console.log("order list-->", this.ordersList);


    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

  OnChange(value) {
    this.value = value;
    console.log(this.value);
  }

  fnOrderDetails(id) {
    this.navCtrl.navigateForward('order-details', { state: id });
  }

  fnLogout() {
    this.navCtrl.navigateForward('home');
  }
}

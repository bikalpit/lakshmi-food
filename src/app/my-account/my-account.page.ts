import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { CommonService } from '../common.service';

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
  status: any;
  selecTextStatus = {
    select: null
  };
  date: any;
  orderDate: any;
  userName: any;
  url: any;
  role:any;

  constructor(private commonService: CommonService, public alertCtrl: AlertController, private datePipe: DatePipe, private auth: AuthService, public navCtrl: NavController, public menu: MenuController) {
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
    this.userName = localStorage.getItem("name");
    this.role = localStorage.getItem("role");
    console.log(this.user_id);
    this.selecTextStatus.select = "Assigned";

  }
  ionViewDidEnter() {
   
    this.url = this.commonService.url();
  }
  ngOnInit() {
    this.fngetDeliveryBoyOrders(this.selecTextStatus.select);
  }
  OnChange(value) {
    this.status = value;
    console.log(this.status);
    this.fngetDeliveryBoyOrders(value);
  }

  fngetDeliveryBoyOrders = value => {
    this.ordersList = [];
    this.requestObject = {
      "order_status": value,
      "delivery_boy_id": this.user_id
    }
    this.auth.showLoader();
    console.log(this.requestObject);
    this.auth.getDeliveryBoyOrders(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.ordersList = this.dataResponse;
      this.ordersList.forEach((element) => {
        element.create_at = this.datePipe.transform(new Date(element.create_at), "dd-MM-yyyy");
      });
      console.log("order list", this.ordersList);
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);

    });

  }

  fnOrderDetails(id) {
    this.navCtrl.navigateForward('order-details', { state: id });
  }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      // header: 'Confirm!',
      // message: "Please enable Your Location",
      message: "Are you sure want to logout?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.fnLogout();
            console.log('Logout clicked');
          }
        }
      ],
    });
    await alert.present();
  }
  fnLogout() {
    localStorage.clear();
    this.navCtrl.navigateForward('home');
  }
  fnChangeStatus(id,status) {
    console.log(status);
    this.requestObject = {
      "order_id": id,
      "order_status": status,
      "user_id": this.user_id,
      "user_type": this.role
    }
    this.auth.showLoader();
    console.log(this.requestObject);
    this.auth.updateOrderStatus(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.auth.hideLoader();
      this.auth.showToast('Order status updated succesfully');
      this.ngOnInit();

    }, (err) => {
      console.log("Error=>", err);
      this.auth.hideLoader();
    });

  }
  doRefresh(event) {
    console.log('Begin async operation', event);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.fngetDeliveryBoyOrders(this.selecTextStatus.select);
      event.target.complete();
    }, 2000);
  }
}

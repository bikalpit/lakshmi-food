import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sales-order-details',
  templateUrl: './sales-order-details.page.html',
  styleUrls: ['./sales-order-details.page.scss'],
})
export class SalesOrderDetailsPage implements OnInit {
  orderInfo: any;
  staffList = [];
  dataResponse: any
  constructor(
    private auth: AuthService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private location: Location,
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.orderInfo = state;
      console.log("order orderInfo-->", this.orderInfo);
    }
  }

  ngOnInit() {
    this.fnGetAllStaff();
  }
  goBack() {
    this.location.back();
  }
  async fnSelectDriver(orderId) {
    const actionSheet = await this.actionSheetController.create({
      header: 'All Staff',
      cssClass: 'my-custom-class',
      buttons: this.createButtons(orderId),
    });
    await actionSheet.present();
  }
  createButtons(orderId) {
    let buttons = [];
    for (let btn of this.staffList) {
      let button = {
        text: btn.name,
        icon: 'person',
        handler: () => {
          console.log(' id ' + btn.id);
          this.fnConfirmAlert(btn.id, orderId, btn.name);
          return true;
        }
      }
      buttons.push(button);
    }

    let button = {
      text: "Cancel",
      icon: 'close',
      handler: () => {
        console.log(' cancel ');
        return true;
      }
    }
    buttons.push(button);
    return buttons;
  }
  fnGetAllStaff() {
    this.staffList = [];
    let requestObject = { "role": "DeliveryBoy" }
    this.auth.showLoader();
    console.log(requestObject);
    this.auth.getAllDriver(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.staffList = data.data;

      console.log("staffList", this.staffList);
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }

  fnSetAssignOrder(id, orderId) {
    let requestObject = {
      "login_id":localStorage.getItem("id"),
      "userId": id,
      "order_id": orderId, 
      "order_status": "Assigned",
      "user_type": localStorage.getItem("role")
    }
    this.auth.showLoader();
    console.log(requestObject);
    this.auth.assignDriver(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.dataResponse = data;
      if (this.dataResponse.status === true) {
        this.location.back();
      }
      this.auth.showToast(this.dataResponse.message);
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }

  fnConfirmAlert(id, orderId, name) {
    this.alertCtrl.create({
      header: 'Assign Order',
      message: 'Are you sure you want to assign to ' + name + '?',
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel!');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.fnSetAssignOrder(id, orderId);
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}

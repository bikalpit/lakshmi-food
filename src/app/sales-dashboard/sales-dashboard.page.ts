import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController ,ActionSheetController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { CommonService } from '../common.service';



@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.page.html',
  styleUrls: ['./sales-dashboard.page.scss'],
  providers: [DatePipe]
})



export class SalesDashboardPage implements OnInit {
  selecTextStatus = {
    select: null
  };
  user_id: any;
  userName: any;
  status: any;
  ordersList = [];
  order_details = null;
  order_item = [];
  customer_details = null;
  driver_details = null;
  orderDate: any;
  dataResponse:any;
  url:any;

  constructor(
    private commonService: CommonService, 
    public actionSheetController: ActionSheetController,
    private auth: AuthService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public menu: MenuController
  ) {
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
    this.userName = localStorage.getItem("name");
    this.selecTextStatus.select = "New";
  }

  ngOnInit() {
    this.url = this.commonService.url();
  }
  ionViewWillEnter(){
    this.fnGetAllOrder(this.selecTextStatus.select);
  }
  ionViewDidEnter() {
    
  }
  OnChange(value) {
    this.status = value;
    console.log(this.status);
    this.fnGetAllOrder(value);
  }
  fnGetAllOrder(status) {

    this.ordersList = [];
    let requestObject = {
      "status": status,
      "userId": this.user_id
    }
    this.auth.showLoader();
    console.log(requestObject);
    this.auth.getSalesOrders(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      this.ordersList = data.data;
     
      console.log("sales order list", this.ordersList);
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }
  fnCancelAccept(id,status){
    let requestObject = {
     
      "order_id": id ,
      "user_id":this.user_id,
      "order_status": status,
      "user_type":localStorage.getItem("role")
    }
    this.auth.showLoader();
    console.log(requestObject);
    this.auth.updateStatusOrder(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      this.dataResponse = data;
      this.auth.showToast(this.dataResponse.message);
      this.fnGetAllOrder(this.selecTextStatus.select);
      console.log("sales order list", this.ordersList);
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }
  fnGotoDetails(item){
    this.navCtrl.navigateForward('sales-order-details', { state: item });
  }
  fnAcceptAlert(id,status){
    this.alertCtrl.create({
      header: status+' Order',
      message: 'Are you sure you want to  '+status+' ?',
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
          this.fnCancelAccept(id, status);
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
  async fnSelectDriver(orderId,status) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Accept',
        icon: 'checkmark',
        handler: () => {
          console.log('Accept clicked');
          this.fnAcceptAlert(orderId,'Approve');
        }
      }, {
        text: 'Reject',
        icon: 'trash',
        handler: () => {
          this.fnAcceptAlert(orderId,'Reject');
          console.log('Reject clicked');
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  doRefresh(event) {
    console.log('Begin async operation', event);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.fnGetAllOrder(this.selecTextStatus.select);
      event.target.complete();
    }, 2000);
  }
}

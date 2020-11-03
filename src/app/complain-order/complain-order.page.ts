import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-complain-order',
  templateUrl: './complain-order.page.html',
  styleUrls: ['./complain-order.page.scss'],
})
export class ComplainOrderPage implements OnInit {
  user_id: any;
  dataResponse: any;
  ordersList=[];
  orderId: any='';
  complain:any='';
  productName:any='';
  DeliveredOrder=0;
  dataOrder=false;
  constructor(
    private location: Location,
    public menu: MenuController,
    public auth: AuthService
  ) {
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
  }

  ngOnInit() {
    this.fngetOrderList();
  }
  goBack() {
    this.location.back();
  }
  fngetOrderList() {
    let requestObject = {
      "order_status": "Delivered",
      "user_id": this.user_id
    }
    this.auth.showLoader();
    console.log(requestObject);
    this.auth.getOrderList(requestObject).subscribe((data: any) => {
      console.log(data);
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.ordersList = this.dataResponse;
      this.DeliveredOrder=this.ordersList.length;
      console.log("order DeliveredOrder-->", this.DeliveredOrder);
    }, (err) => {
      console.log("Error=>", err);
      this.auth.hideLoader();
    });

  }
  fnSelectOrderID(id) {
    console.log(id);
  }
  fnSendComplaint(){
    if(this.complain!=='' && this.user_id!==''){
      let requestObject = {
        "complain": this.complain,
        "order_id": this.orderId,
        "user_id": this.user_id
      }
      this.auth.showLoader();
      console.log(requestObject);
      this.auth.complainOrder(requestObject).subscribe((data: any) => {
        console.log(data);
        this.auth.hideLoader();
        if(data.status===true){
          this.auth.showToast(data.message)
          this.complain='';
          this.productName='';
          this.orderId='';
        }
  
      }, (err) => {
        console.log("Error=>", err);
        this.auth.hideLoader();
      });
    }else{
      this.auth.showToast("Please Enter Order id and complain!");
    }
    
  }
}

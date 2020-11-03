import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController,AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.page.html',
  styleUrls: ['./your-cart.page.scss'],
})
export class YourCartPage implements OnInit {
  data: any;
  qty: any;
  id: any;
  name: any;
  weight: any;
  price: any;

  cartData = [];
  cancelOrder: any;
  url: any;
  subTotal: any;
  totQty: any;
  sumProduct: any;
  serviceCount: any;
  mainSubTotal: any;
  current_array: any;
  public item_qty = 0;
  public user_id:any;

  constructor(
    public alertCtrl: AlertController,
    private commonService: CommonService, private location: Location,
    public loadingCtrl: LoadingController,
    private auth: AuthService, public toast: ToastController,
    public navCtrl: NavController,
    public modalCtrl: ModalController) {
    this.user_id = localStorage.getItem("id");
    this.url = this.commonService.url();

    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
    console.log("cart data-->", this.cartData);


    var total_price = 0;
    this.mainSubTotal = 0;
    this.cartData = JSON.parse(localStorage.getItem("cartData"));

    this.cartData.forEach(element => {

      total_price = parseInt(element.qty) * parseInt(element.price);
      console.log(total_price);

      element.subtotal = parseInt(element.qty) * parseInt(element.price);
      console.log("total->", element.subtotal);

      this.mainSubTotal = this.mainSubTotal + total_price;
      localStorage.setItem("mainsubtotal", this.mainSubTotal);
      console.log(this.mainSubTotal);

    });

  }


  cancelData(id) {
    console.log(id);


    /*  let index = this.cartData.indexOf(id);
      this.cartData.splice(index, 1);*/

    let index = this.cartData.indexOf(id);

    if (index > -1) {
      this.cartData.splice(index, 1);
    }

    console.log("new array", this.cartData);

    localStorage.setItem("cartData", JSON.stringify(this.cartData));

    var total_price = 0;
    this.mainSubTotal = 0;
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
    this.cartData.forEach(element => {

      total_price = parseInt(element.qty) * parseInt(element.price);
      console.log(total_price);

      element.subtotal = parseInt(element.qty) * parseInt(element.price);
      console.log("total->", element.subtotal);

      this.mainSubTotal = (this.mainSubTotal + total_price);
      this.mainSubTotal = parseFloat(this.mainSubTotal).toFixed(2);
      localStorage.setItem("mainsubtotal", this.mainSubTotal);
      console.log(this.mainSubTotal);

    });

  }
  ngOnInit() {

  }
  goBack() {
    this.location.back();
  }

  fnProceedToCheckout() {
   /*  if (this.mainSubTotal !== 0) {
      this.navCtrl.navigateForward('select-address');
    } else {
      this.auth.showToast('Please select atleast one Item!');
    } */

    this.fnConfirmOrder();

  }
  fnBackToProductList() {
    this.navCtrl.navigateForward('product-list');

  }
  fnremove() {
    if (this.item_qty - 1 < 1) {
      this.item_qty = 1;
      console.log('item_1->' + this.item_qty)
    }
    else {
      this.item_qty -= 1;
      console.log('item_2->' + this.item_qty);
    }
    console.log("hello");
  }

  fnadd() {
    this.item_qty += 1;
    console.log(this.item_qty + 1);
    console.log("hello add function");
  }

  fnOrderPlace() {
    var sendcartDate = [];
    this.cartData.forEach(element => {
      sendcartDate.push({
        'productId': element.id,
        'product_price': element.price,
        'product_qty': element.qty,
        'totalPrice': parseInt(element.price) * parseInt(element.qty)
      });
    });

    let requestObject = {
      "userId": this.user_id,
      "totalAmount": this.mainSubTotal,
      "addressId": localStorage.getItem("address_id"),
      "areaMaster":localStorage.getItem("area_master_id"),
      "cartData": sendcartDate
    }
    this.auth.showLoader();

    this.auth.orderPlace(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      if (data.status == true) {
        localStorage.removeItem('cartData');
        localStorage.setItem('OrderNumber', data.data.order_id);
        this.auth.showToast('Orders Place successfully');
        this.navCtrl.navigateRoot('success-order');
      } else {
        this.auth.showToast(data.message);
      }
    }, (err) => {
      console.log("Error=>", err);
    });
  }
  
  fnConfirmOrder(){
    this.alertCtrl.create({
      header: 'Place Order',
      message: 'Are you sure you want to place order?',
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
          this.fnOrderPlace();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}

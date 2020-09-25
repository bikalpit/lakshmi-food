import { Component, OnInit, AbstractType, ChangeDetectorRef } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {
  user_id: any;
  requestObject: any;
  dataResponse: any;
  addressList = [];
  mainSubTotal: any;
  cartData: any;
  address_id: any;
  allUpdatedAddress=[];
  address_index:any;
  mycheck = false;

  constructor( public alertCtrl: AlertController,public navCtrl: NavController, private auth: AuthService, private change: ChangeDetectorRef) {
    this.user_id = localStorage.getItem("id");
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
    this.mainSubTotal = localStorage.getItem("mainsubtotal");
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.fngetAddressDetails();
  }

  fnAddNewAddress() {
    this.navCtrl.navigateForward('add-address');
  }

  fnBackToYourCart() {
    this.navCtrl.navigateForward('your-cart');
  }

  fngetAddressDetails() {
    this.allUpdatedAddress = [];
    this.requestObject = {
      "user_id": this.user_id
    }
    this.auth.showLoader();
    this.auth.getAddressList(this.requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.addressList = this.dataResponse;

      this.addressList.forEach(element => {
        element.is_check = false;
      });
      for (let obj of this.addressList) {
        this.allUpdatedAddress.push({
          id: obj.id,
          address_user_id: obj.address_user_id,
          address_house_no: obj.address_house_no,
          address_area: obj.address_area,
          address_city: obj.address_city,
          address_state: obj.address_state,
          address_landmark: obj.address_landmark,
          address_zipcode: obj.address_zipcode,
          address_type: obj.address_type,
          address_mobile_no: obj.address_mobile_no,
          address_created: obj.address_created,
          address_updated: obj.address_updated,
          name: obj.name,
          value: false
        });
      }
      console.log('allUpdatedAddress - > ',this.allUpdatedAddress);
    }, (err) => {
      console.log("Error=>", err);
      this.auth.hideLoader();
    });
  }

  updateAddress(data) {
    console.log(data);
    this.navCtrl.navigateForward('edit-address', { state: data });
  }



  fnProceedToCheckout() {
   
    if (this.mycheck  == false) {
      this.auth.showToast('Please select address');
      return;
    }
    this.address_id = this.allUpdatedAddress[this.address_index].id;
    var sendcartDate = [];
    this.cartData.forEach(element => {
      sendcartDate.push({
        'productId': element.id,
        'product_price': element.price,
        'product_qty': element.qty,
        'totalPrice': parseInt(element.price) * parseInt(element.qty)
      });
    });

    this.requestObject = {
      "userId": this.user_id,
      "totalAmount": this.mainSubTotal,
      "addressId": this.address_id,
      "cartData": sendcartDate
    }
    this.auth.showLoader();

    this.auth.orderPlace(this.requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      if (data.status == true) {
        localStorage.removeItem('cartData');
        localStorage.setItem('OrderNumber', data.data.order_id);
        this.auth.showToast('Orders Place successfully');
        this.navCtrl.navigateForward('success-order');
      } else {
        this.auth.showToast(data.message);
      }
    }, (err) => {
      console.log("Error=>", err);
    });
  }

  selection(id,index) {
    this.address_index = index;
    this.mycheck =! this.mycheck;
    this.allUpdatedAddress.forEach(x => {
      if (x.id !== id) { 
        x.value = !x.value
      }
    })
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: "Are you sure want to Book order?",
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
            console.log('Logout clicked');
          }
        }
      ],
    });
    await alert.present();
  }
}

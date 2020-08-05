import { Component, OnInit, AbstractType } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor(public navCtrl: NavController, private auth: AuthService) {
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

    this.cartData = JSON.parse(localStorage.getItem("cartData"));

    this.mainSubTotal = localStorage.getItem("mainsubtotal");
  
  }

  ngOnInit() {
    this.fngetAddressDetails();

  }
  fnAddNewAddress() {
    this.navCtrl.navigateForward('add-address');
  }

  fnBackToYourCart() {
    this.navCtrl.navigateForward('your-cart');
  }

  fngetAddressDetails() {
    this.requestObject = {
      "user_id": this.user_id
    }
    console.log(this.requestObject);
    this.auth.getAddressList(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.dataResponse = data.data;
      this.addressList = this.dataResponse;
      console.log("address->", this.addressList);
    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

  updateAddress(data) {
    console.log(data);
    this.navCtrl.navigateForward('edit-address', { state: data });
    // this.navCtrl.navigateForward('edit-address',{ id : id });

  }

  fnProceedToCheckout() {
    this.requestObject = {
      "user_id": this.user_id,
      "totalAmount": this.mainSubTotal,
      "addressId": this.user_id,
      "cartData":JSON.parse(localStorage.getItem("cartData"))
    }

    console.log(this.requestObject);
    this.auth.orderPlace(this.requestObject).subscribe((data: any) => {
      console.log(data);
    
    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
    //this.navCtrl.navigateForward('success-order');
  }

}

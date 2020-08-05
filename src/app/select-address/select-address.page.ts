import { Component, OnInit } from '@angular/core';
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
  constructor(public navCtrl: NavController, private auth: AuthService) {
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);
  }

  ngOnInit() {
    this.fngetAddressDetails();

  }
  fnAddNewAddress() {
    this.navCtrl.navigateForward('add-address');
  }
  fnProceedToCheckout() {
    this.navCtrl.navigateForward('success-order');
  }
  fnBackToYourCart() {
    this.navCtrl.navigateForward('your-cart');
  }

  fngetAddressDetails() {
    this.requestObject = {
      "user_id": "12"
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
}

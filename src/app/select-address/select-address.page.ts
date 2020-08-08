import { Component, OnInit, AbstractType, ChangeDetectorRef } from '@angular/core';
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
  address_id: any;
  allUpdatedAddress=[];

  constructor(public navCtrl: NavController, private auth: AuthService, private change: ChangeDetectorRef) {
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
          is_check: false
        });
      }
      console.log('allUpdatedAddress - > ',this.allUpdatedAddress);
    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
      this.auth.hideLoader();
    });
  }

  updateAddress(data) {
    console.log(data);
    this.navCtrl.navigateForward('edit-address', { state: data });
    // this.navCtrl.navigateForward('edit-address',{ id : id });
  }
  // checkEvent(id) {
  //   this.add_id = id;
  //   console.log(this.add_id);
  // }
  fnProceedToCheckout() {

    if (this.address_id == '' || this.address_id == undefined) {
      this.auth.showToast('Please select address');
      return;
    }

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

    this.auth.orderPlace(this.requestObject).subscribe((data: any) => {
      if (data.status == true) {
        localStorage.removeItem('cartData');
        localStorage.setItem('OrderNumber', data.data.order_id);
        this.navCtrl.navigateForward('success-order');
      } else {
        this.auth.showToast(data.message);
      }

    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showToast(err.error.message);
    });

  }

  fncheckbox(event,ind ,index) {
  
    this.address_id = '';
    var i = 0;
    this.allUpdatedAddress.forEach(element => {
      // element.is_check = false;
     /*  if (event.detail.checked == true && index == i) {
        this.addressList[index].is_check = event.detail.checked;
        this.address_id = this.addressList[index].id;
      }
      i++; */
     /*  this.addressList[index].is_check =true;
      console.log('before element -- > ',element.is_check); */
     
      element.is_check =false;
    });
   /*  this.addressList[index].is_check = event.detail.checked;
    console.log('Index -- > ',index);
    console.log('Index -- > ',index); */
   
    this.allUpdatedAddress.find(v => v.id == index).is_check =true;
    this.change.detectChanges();
   /*  if(this.allUpdatedAddress.find(v => v.id == index).is_check ==true){
      this.allUpdatedAddress.find(v => v.id == index).is_check =false;
    }else{
      this.allUpdatedAddress.find(v => v.id == index).is_check =true;
    } */
    this.address_id = index;
    console.log(this.allUpdatedAddress);
    console.log(index);

    
  }

}

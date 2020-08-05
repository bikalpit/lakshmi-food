import { Component, OnInit, AbstractType,ChangeDetectorRef } from '@angular/core';
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
  address_id:any;

  constructor(public navCtrl: NavController, private auth: AuthService, private change: ChangeDetectorRef) {
    this.user_id = localStorage.getItem("id");
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

    this.auth.getAddressList(this.requestObject).subscribe((data: any) => {
      this.dataResponse = data.data;
      this.addressList = this.dataResponse;

      this.addressList.forEach(element => {
        element.is_check=false;
      });

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
   
    if(this.address_id=='' || this.address_id==undefined){
      this.auth.showToast('Please select address');
      return;
    }

    var sendcartDate = [];

    this.cartData.forEach(element => {
      sendcartDate.push({
        'productId' : element.id,
        'product_price': element.price,
        'product_qty': element.qty,
        'totalPrice' : parseInt(element.price)*parseInt(element.qty)
      });
    });

    this.requestObject = {
      "userId": this.user_id,
      "totalAmount": this.mainSubTotal,
      "addressId": this.address_id,
      "cartData":sendcartDate
    }
  
    this.auth.orderPlace(this.requestObject).subscribe((data: any) => {
      if(data.status==true){
        localStorage.removeItem('cartData');
        this.navCtrl.navigateForward('success-order');
      }else{
        this.auth.showToast(data.message);
      }

    },(err) => {
      console.log("Error=>", err);
      //this.auth.showToast(err.error.message);
    });

  }

  fncheckbox(event,index){
    
    this.address_id ='';

    var i=0;
    this.addressList.forEach(element => {
      element.is_check=false;
      if(event.detail.checked==true && index==i){
         this.addressList[index].is_check = event.detail.checked;
         this.address_id=this.addressList[index].id;
      }
      i++;
    });

    this.change.detectChanges();

  }

}

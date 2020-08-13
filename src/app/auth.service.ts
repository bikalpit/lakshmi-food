import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';
import { ToastController,LoadingController } from '@ionic/angular';


@Injectable()
export class AuthService {

  constructor(public loadingCtrl:LoadingController,private http: HttpClient, public toastCtrl : ToastController,public commonService: CommonService) { }

  login(data): Observable<any> {
    return this.commonService.postWithoutToken('users/login', data);
  }

  signup(data): Observable<any>{
    return this.commonService.postWithoutToken('users/signup', data);
  }

  changePassword(data): Observable<any>{
    return this.commonService.postWithoutToken('users/change_password', data);
  }
 
  forgotPassword(data): Observable<any>{
    return this.commonService.postWithoutToken('users/forgot_password', data);
  }

  checkOtp(data): Observable<any>{
    return this.commonService.postWithoutToken('users/check-otp', data);
  }

  updatePassword(data): Observable<any>{
    return this.commonService.postWithoutToken('users/update-password', data);
  }

  getProductDetails(data): Observable<any>{
    return this.commonService.postWithoutToken('products/get_product_list', data);
  }

  getUsersDetails(data): Observable<any>{
    return this.commonService.postWithoutToken('users/get_user_detail', data);
  }
  
  editProfile(data): Observable<any>{
    return this.commonService.postWithoutToken('users/edit-profile', data);
  }

  addAddress(data): Observable<any>{
    return this.commonService.post('users/add-address', data);
  }

  getAddressList(data): Observable<any>{
    return this.commonService.postWithoutToken('users/get_address_list', data);
  }

  editAddress(data): Observable<any>{
    return this.commonService.postWithoutToken('users/edit_address', data);
  }

  orderPlace(data): Observable<any>{
    return this.commonService.postWithoutToken('orders/order-place', data);
  }

  getOrderList(data): Observable<any>{
    return this.commonService.postWithoutToken('orders/orders_list', data);
  }

  getOrderDetails(data): Observable<any>{
    return this.commonService.postWithoutToken('orders/get_order_detail', data);
  }

  getDeliveryBoyOrders(data): Observable<any>{
    return this.commonService.postWithoutToken('orders/get_delivery_boy_orders', data);
  }

  cancelOrder(data): Observable<any>{
    return this.commonService.postWithoutToken('orders/cancel_order', data);
  }

  updateOrderStatus(data): Observable<any>{
    return this.commonService.postWithoutToken('orders/update_order_status', data);
  }

  showToast(msg) {
    return this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  showLoader() {
    this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    });
  }
  hideLoader() {
    this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }
}

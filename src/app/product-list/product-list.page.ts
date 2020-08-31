import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { CommonService } from '../common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {


  requestObject: any;
  allProducts = [];
  lazyListProduct = [];
  dataResponse: any;
  page = 1;
  isloadmore: boolean = false;
  htmlData: any;
  userAllArray: any;
  url: any;

  constructor(public loadingCtrl: LoadingController, private location: Location, public modalController: ModalController, public navCtrl: NavController, private auth: AuthService, private commonService: CommonService) {
    // this.getProductList(this.page);
    this.url = this.commonService.url();
  }
  ngOnInit() {
    this.getProductList(false,"");
  }

   /* async showModal(data) {
    const modal = await this.modalController.create({
      component: ModalPopupPage,
      cssClass: 'myModal',
      componentProps: {
        'name': data
      }
    });
    return await modal.present();
  } */

  goBack() {
    this.location.back();
  }

  fnBackToDashboard() {
    this.navCtrl.navigateForward('dashboard');
  }

  fnAddToCart() {
      this.navCtrl.navigateForward('your-cart');  
  }

  getProductList(isFirstLoad,event) {
    if(isFirstLoad===false)
        this.showLoader();
    this.requestObject = {
      "page_no": this.page,
      "offset": "10"
    };
    this.auth.getProductDetails(this.requestObject).subscribe((data: any) => {
      this.hideLoader();
      this.dataResponse = data.data.product_data;
      for (let i = 0; i < this.dataResponse.length; i++) {
        this.lazyListProduct.push(this.dataResponse[i]);
      }
      if (isFirstLoad)
          event.target.complete();

        this.page++;
    }, (err) => {
      this.hideLoader();
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
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

  doInfinite(event) {
    this.getProductList(true, event);
  }
  async showModal(data){
    const presentModel = await this.modalController.create({
      component: ModalPopupPage,
      componentProps: {
        'name': data
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'change-select-card-modal'
    });

    presentModel.onWillDismiss().then((data)=>{
      console.log(data);
      //custom code
     
    });
    return await presentModel.present();
  }
}

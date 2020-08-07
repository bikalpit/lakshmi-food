import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  dataResponse: any;
  page = 0;
  isloadmore: boolean = false;
  htmlData: any;
  userAllArray: any;
  url:any;
  
  constructor(private location: Location,public modalController: ModalController, public navCtrl: NavController, private auth: AuthService,private commonService: CommonService) { }

  ngOnInit() {
    this.getProductList();
    this.url = this.commonService.url();

  }
 
  async showModal(data) {
    const modal = await this.modalController.create({
      component: ModalPopupPage,
      cssClass: 'myModal',
      componentProps: {
        'name': data
      }
    });
    return await modal.present();
  }
  
  goBack() {
    this.location.back();
  }

  fnAddToCart() {
    this.navCtrl.navigateForward('your-cart');
  }

  getProductList() {

    this.requestObject = {
      "page_no": "1",
      "offset": "25"
    };

    this.auth.getProductDetails(this.requestObject).subscribe((data: any) => {
      this.dataResponse = data.data.product_data;
      this.allProducts = this.dataResponse;
    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

}

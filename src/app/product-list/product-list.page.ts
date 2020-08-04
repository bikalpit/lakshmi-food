import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

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
  constructor(public modalController: ModalController, public navCtrl: NavController, private auth: AuthService) { }

  ngOnInit() {
    this.getProductList();
  }
  //   openModal(){ 

  //    this.data = { message : 'hello world' };
  //   var modalPage = this.modalController.create('ModalPage',data);
  //   modalPage.present();
  // }
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
  fnAddToCart() {
    this.navCtrl.navigateForward('your-cart');
  }

  getProductList() {

    this.requestObject = {

      "page_no": "1",
      "offset": "25"

    }
    console.log(this.requestObject);
    this.auth.getProductDetails(this.requestObject).subscribe((data: any) => {
      console.log("api response", data);

      // this.dataResponse = data;
      // console.log("list-->",this.dataResponse);
      // this.allProducts = this.dataResponse.data;
      this.dataResponse = data.data.product_data;
      this.allProducts = this.dataResponse;
      console.log("product data-->", this.allProducts);


    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

}

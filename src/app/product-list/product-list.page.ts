import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  constructor(public modalController: ModalController,public navCtrl: NavController) { }

  ngOnInit() {
  }
//   openModal(){ 
    
//    this.data = { message : 'hello world' };
//   var modalPage = this.modalController.create('ModalPage',data);
//   modalPage.present();
// }
async showModal() {
  const modal = await this.modalController.create({
    component: ModalPopupPage,
    cssClass:'myModal',
    componentProps: {
      'name': 'Hello User'
    }
  });
  return await modal.present();
}
fnAddToCart(){
  this.navCtrl.navigateForward('your-cart');

}
}

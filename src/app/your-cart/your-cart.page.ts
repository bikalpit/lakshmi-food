import { Component, OnInit } from '@angular/core';
import { NavController ,ModalController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.page.html',
  styleUrls: ['./your-cart.page.scss'],
})
export class YourCartPage implements OnInit {
  data:any;
  qty:any;
  id:any;
  name:any;
  weight:any;
  price:any;

  cartData=[];

  constructor(public navCtrl: NavController,private route: ActivatedRoute, private router: Router, public modalCtrl: ModalController) { 
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
    console.log("cart data-->",this.cartData);
  }
 
  ngOnInit() {
    
  }

  fnProceedToCheckout(){
    this.navCtrl.navigateForward('select-address');

  }
  fnBackToProductList(){
    this.navCtrl.navigateForward('product-list');

  }
}

import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.page.html',
  styleUrls: ['./your-cart.page.scss'],
})
export class YourCartPage implements OnInit {
  data: any;
  qty: any;
  id: any;
  name: any;
  weight: any;
  price: any;

  cartData = [];

  subTotal: any;
  totQty: any;
  sumProduct: any;
  serviceCount: any;
  mainSubTotal:any;
  constructor(public navCtrl: NavController, private route: ActivatedRoute, private router: Router, public modalCtrl: ModalController) {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.cartData = JSON.parse(localStorage.getItem("cartData"));
    console.log("cart data-->", this.cartData);


    var total_price = 0;
    this.mainSubTotal =0;
    this.cartData = JSON.parse(localStorage.getItem("cartData"));

    this.cartData.forEach(element => {

      total_price = parseInt(element.qty) * parseInt(element.price);
      console.log(total_price);

      element.subtotal = parseInt(element.qty) * parseInt(element.price);   
      console.log("total->",element.subtotal);

      this.mainSubTotal = this.mainSubTotal + total_price;
      localStorage.setItem("mainsubtotal",this.mainSubTotal);
      console.log(this.mainSubTotal);

    });
   
  }

  ngOnInit() {
  
  }

  fnProceedToCheckout() {
    this.navCtrl.navigateForward('select-address');

  }
  fnBackToProductList() {
    this.navCtrl.navigateForward('product-list');

  }
}

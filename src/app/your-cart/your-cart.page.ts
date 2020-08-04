import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.page.html',
  styleUrls: ['./your-cart.page.scss'],
})
export class YourCartPage implements OnInit {
  data:any;
  qty:any;
  constructor(public navCtrl: NavController,private route: ActivatedRoute, private router: Router) { 

    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
        this.data = state.data;
        this.qty = state.qty;
        console.log("cart data-->",this.data);
        console.log("qty-->",this.qty);
    }
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

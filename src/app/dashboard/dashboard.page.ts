import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public menu: MenuController, public navCtrl: NavController,) {
    this.menu.enable(true);
    localStorage.setItem("cartData", '');
  }
 
  ngOnInit() {
  }
  fnViewProducts() {

    this.navCtrl.navigateForward('product-list');
  }
  fnProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }
  myOrder(){
    this.navCtrl.navigateForward('customer-orders');
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  constructor(public navCtrl: NavController,public menu: MenuController) {
    this.menu.enable(true);

   }

  ngOnInit() {
  }
  fnOrderDetails(){
    this.navCtrl.navigateForward('order-details');
  }
  fnLogout(){
    this.navCtrl.navigateForward('home');
  }
}

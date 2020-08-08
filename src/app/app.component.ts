import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user_id: any;
  username: any = localStorage.getItem('username');
  email: any = localStorage.getItem('email');
  role: any = localStorage.getItem("role");
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    public navCtrl: NavController
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.user_id = localStorage.getItem("id");
      console.log(this.user_id);

      this.username = localStorage.getItem("username");
      console.log(this.username);

      this.email = localStorage.getItem("email");
      console.log(this.email);

      this.role = localStorage.getItem("role");
      console.log(this.role);

      if (localStorage.getItem('username')) {

        if (localStorage.getItem('role') == 'Customer') {

          this.navCtrl.navigateForward('dashboard');

        } else if (localStorage.getItem('role') == 'DeliveryBoy') {

          this.navCtrl.navigateForward('my-account');
        }
      }
      else {
        this.navCtrl.navigateForward('home');
      }

    });
  }


  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    
  }


  fnMyAccount() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('my-account');
    this.menu.enable(false);

  }

  fnEditProfile() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('edit-profile');
    this.menu.enable(false);

  }

  fnChangePassword() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('change-password');
    this.menu.enable(false);

  }

  fnLogout() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('home');
    this.menu.enable(false);
    localStorage.clear();
  }

  fnDashboard() {
    /* this.menu.enable(true);
    this.navCtrl.navigateForward('dashboard');
    this.menu.enable(false); */
    this.menu.toggle();
  }

  fnMyOrders() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('customer-orders');
    this.menu.enable(false);
  }

}

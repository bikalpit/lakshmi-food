import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user_id: any;
  firm_name: any = localStorage.getItem('firm_name');
  name: any = localStorage.getItem('name');
  email: any = localStorage.getItem('email');
  role: any = localStorage.getItem("role");

  photo: any = localStorage.getItem("photos");
  constructor(private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) {
    if (localStorage.getItem("photos")) {
      this.photo = 
      localStorage.getItem("photos");
    } else {
      this.photo = '';
    }
    console.log('this.photo  -- ',this.photo);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      this.user_id = localStorage.getItem("id");
      this.firm_name = localStorage.getItem("firm_name");
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
      this.role = localStorage.getItem("role");
      this.photo = localStorage.getItem("photos");

      console.log("this.role-----", this.role);
      if (localStorage.getItem('role')) {
        if (localStorage.getItem('role') == 'Customer') {
          this.navCtrl.navigateForward('dashboard');
          // this.navCtrl.navigateForward('add-address');
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
    localStorage.clear();
    this.navCtrl.navigateForward('home');
    this.menu.enable(false);
  }

  fnDashboard() {
    this.menu.toggle();
  }

  fnMyOrders() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('customer-orders');
    this.menu.enable(false);
  }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: "Are you sure want to logout?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.fnLogout();
            console.log('Logout clicked');
          }
        }
      ],
    });
    await alert.present();
  }
}

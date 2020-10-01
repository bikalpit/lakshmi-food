import { Component, ChangeDetectorRef } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalFooServiceService } from './global-foo-service.service';


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
  rootPage: any;

  photo: any = localStorage.getItem("photos");
  constructor(
    public globalFooService: GlobalFooServiceService,
    public changeDetectorRef: ChangeDetectorRef,
    private _location: Location,
    private router: Router,
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
    console.log('this.photo  -- ', this.photo);
    this.initializeApp();
    this.globalFooService.getObservable().subscribe((data) => {
      console.log('Data received', data);
      this.name = data.name;
      this.email = data.email;
      this.role = data.role;
      this.photo = data.photo;

    });
  }
  ngOnInit() {
    this.changeDetectorRef.detectChanges();
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
          this.rootPage = "/dashboard";
          this.navCtrl.navigateRoot('dashboard');
          // this.navCtrl.navigateForward('add-address');
        } else if (localStorage.getItem('role') == 'DeliveryBoy') {
          this.rootPage = "/my-account";
          this.navCtrl.navigateRoot('my-account');

        }
      }
      else {
        this.rootPage = "/home";
        this.navCtrl.navigateRoot('home');
      }


      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        console.log('Back press handler!');
        if (this._location.isCurrentPathEqualTo(this.rootPage)) {

          // Show Exit Alert!
          console.log('Show Exit Alert!');
          this.showExitConfirm();
          processNextHandler();
        } else {

          // Navigate to back page
          console.log('Navigate to back page');
          this._location.back();

        }

      });

      this.platform.backButton.subscribeWithPriority(5, () => {
        console.log('Handler called to force close!');
        this.alertCtrl.getTop().then(r => {
          if (r) {
            navigator['app'].exitApp();
          }
        }).catch(e => {
          console.log(e);
        })
      });


    });
  }

  showExitConfirm() {
    this.alertCtrl.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
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
    this.rootPage = "/home";
    localStorage.clear();
    this.menu.enable(true);
    this.navCtrl.navigateRoot('/home');
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

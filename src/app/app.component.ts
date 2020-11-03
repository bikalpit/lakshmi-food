import { Component, ChangeDetectorRef } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalFooServiceService } from './global-foo-service.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthService } from './auth.service';
import {enableProdMode} from '@angular/core';



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
    private auth: AuthService,
    private push: Push,
    public globalFooService: GlobalFooServiceService,
    public changeDetectorRef: ChangeDetectorRef,
    private _location: Location,
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
  }
  ngOnInit() { 
  }
  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      this.initPushNotification();

      this.user_id = localStorage.getItem("id");
      this.firm_name = localStorage.getItem("firm_name");
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
      this.role = localStorage.getItem("role");
      this.photo = localStorage.getItem("photos");

      this.globalFooService.getObservable().subscribe((data) => {
        console.log('Data received', data);
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.photo = data.photo;
        this.rootPage = data.rootPage;
      });
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        console.log('Back press handler!');
        enableProdMode();
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

      console.log("this.role-----", this.role);
      if (!this.role && this.role===null) {
        this.rootPage = "/home";
        // this.navCtrl.navigateRoot('home');
      }
      else {
        if (this.role == 'Customer') {
          this.rootPage = "/dashboard";
          // this.navCtrl.navigateRoot('dashboard');
          // this.navCtrl.navigateForward('add-address');
        } else if (this.role == 'DeliveryBoy') {
          this.rootPage = "/my-account";
          // this.navCtrl.navigateRoot('my-account'); 

        } else if (this.role == 'Salesman') {
          this.rootPage = "/sales-dashboard";
          // this.navCtrl.navigateRoot('sales-dashboard');
        } 
      }
      this.navCtrl.navigateRoot(this.rootPage);

     


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

  fnMyAddress() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('my-address');
    this.menu.enable(false);
  }

  fnChangePassword() {
    this.menu.enable(true);
    this.navCtrl.navigateForward('change-password');
    this.menu.enable(false);
  }
  fnComplain(){
    this.menu.enable(true);
    this.navCtrl.navigateForward('complain-order');
    this.menu.enable(false);
  }
  fnLogout() {

    let requestObject = {
      "userId": this.user_id,
    }
    this.auth.showLoader();
    this.auth.logout(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      if (data.status === true) {
        // this.auth.showToast(data.message);
        this.rootPage = "/home";
        localStorage.setItem('role',null);
        this.menu.enable(true);
        this.navCtrl.navigateRoot('/home');
        this.menu.enable(false);
      } else {
        this.auth.showToast(data.message);
      }
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });


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

  // / Push notification /
  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Arshad :- Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '330083022899',
        sound: 'true',
        vibrate: true,
        forceShow: true,
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true',
        clearBadge: 'false',
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((data: any) => {
      //alert('device data ->' + JSON.stringify(data));
      console.log('device token -> ' + JSON.stringify(data.registrationId));
      localStorage.setItem('device_token', data.registrationId);

    });

    pushObject.on('notification').subscribe((notification: any) => {
      
      if (notification.additionalData.foreground) {
        let item=notification.additionalData;
        // if application open, show popup
        alert( JSON.stringify(notification))
        console.log('in forground ',notification);
        if(item.user_type=='Customer' && item.status=='Approve'){
          this.navCtrl.navigateForward('summary', { state: {id:item.id,order_number:item.order_number} });
        }
      } else {
        console.log('n background ',notification);
      }
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
 
}

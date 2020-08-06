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
    });
  }
  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }
  
  // openEnd() {
  //   this.menu.open('end');
  // }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
 
  
  fnMyAccount(){
    this.menu.enable(true);
    this.navCtrl.navigateForward('my-account');
    this.menu.enable(false);
    
  }

  fnEditProfile(){
    this.menu.enable(true);
    this.navCtrl.navigateForward('edit-profile');
    this.menu.enable(false);

  }

  fnChangePassword(){
    this.menu.enable(true);
    this.navCtrl.navigateForward('change-password');
    this.menu.enable(false);

  }

  fnLogout(){
    this.menu.enable(true);
    this.navCtrl.navigateForward('home');
    this.menu.enable(false);
    localStorage.clear();
  }

  fnDashboard(){
    this.menu.enable(true);
    this.navCtrl.navigateForward('dashboard');
    this.menu.enable(false);
  }

}

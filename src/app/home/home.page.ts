import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController) {}
  fnSignUp(){
    this.navCtrl.navigateForward('register');
  }
  fnLogin(){
    this.navCtrl.navigateForward('dashboard');
  }
  fnForgotPassword(){
    this.navCtrl.navigateForward('forgot-password');

  }
}

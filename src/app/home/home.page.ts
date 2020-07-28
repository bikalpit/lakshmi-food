import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
 import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login = { username: "", password: "" };
  requestObject: any;
  dataResponse: any;
  constructor(public navCtrl: NavController, 
     private auth: AuthService
    ) { }


    fnLogin() {

      if (this.login.username && this.login.password) {

          this.requestObject = {
            "username": this.login.username,
            "password": this.login.password
          }
          
          this.auth.login(this.requestObject).subscribe((data: any) => {
            console.log(data);
          }, (err) => {
            console.log("Error=>",err);
            //this.auth.showError(err.error.message);
          });

      }
    }
    
  fnSignUp() {
    this.navCtrl.navigateForward('register');
  }


  fnForgotPassword() {
    this.navCtrl.navigateForward('forgot-password');

  }
}

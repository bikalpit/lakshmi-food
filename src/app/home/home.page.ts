import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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
  public myToast: any;
  constructor(public navCtrl: NavController,
    private auth: AuthService, public toast: ToastController
  ) { }


  fnLogin() {

    if (this.login.username != '' && this.login.password != '') {

      this.requestObject = {
        "username": this.login.username,
        "password": this.login.password
      }

      this.auth.login(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.dataResponse = data;

        if (this.dataResponse.status == true) {
        
            localStorage.setItem("id", this.dataResponse.data.id);
            console.log(this.dataResponse.data.id);

            localStorage.setItem("email", this.dataResponse.data.email);
            console.log(this.dataResponse.data.email);

            this.navCtrl.navigateForward('/dashboard');
          
        } else {
          //this.showToast1();
          this.auth.showToast('Please enter valid username or password');
        }
      }, (err) => {
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });

    } else {
      this.auth.showToast('Enter Email and Password');
    }
  }
  
  fnSignUp() {
    this.navCtrl.navigateForward('/register');
  }

  fnForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');

  }
}

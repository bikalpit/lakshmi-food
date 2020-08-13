import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
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
  loading: any;
  constructor(public navCtrl: NavController,
    private auth: AuthService, public toast: ToastController,
    public loadingCtrl: LoadingController,
  ) { }
  fnLogin() {
    if (this.login.username != '') {
      if (this.login.password != '') {
        this.requestObject = {
          "username": this.login.username,
          "password": this.login.password
        }
        this.showLoader();
        this.auth.login(this.requestObject).subscribe((data: any) => {
          console.log(data);
          this.dataResponse = data;
          this.hideLoader();

          if (this.dataResponse.status == true) {

            localStorage.setItem("id", this.dataResponse.data.id);
            console.log(this.dataResponse.data.id);
            localStorage.setItem("email", this.dataResponse.data.email);
            localStorage.setItem("username", this.dataResponse.data.username);
            localStorage.setItem("role", this.dataResponse.data.role);
            console.log(this.dataResponse.data.email);
            if (this.dataResponse.data.role == 'DeliveryBoy') {
              this.navCtrl.navigateForward('my-account');
            } else {
              this.navCtrl.navigateForward('/dashboard');
            }

            //window.location.reload();
          } else {
            //this.showToast1();
            this.hideLoader();
            this.auth.showToast('Please enter valid username or password');
          }
        }, (err) => {
          console.log("Error=>", err);
          //this.auth.showError(err.error.message);
          this.hideLoader();
        });

      } else {
        this.auth.showToast('Please enter password!');
      }

    } else {
      this.auth.showToast('Enter Email!');
    }
  }

  fnSignUp() {
    this.navCtrl.navigateForward('/register');
  }

  fnForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');

  }
  showLoader() {
    this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    });
  }
  hideLoader() {
    this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }
}

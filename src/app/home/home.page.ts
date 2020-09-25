import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { environment } from '../../environments/environment'
declare var document: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login = { phone: "", password: "" };
  requestObject: any;
  dataResponse: any;
  public myToast: any;
  loading: any;
  isKeyboardHide = true;
  constructor(public navCtrl: NavController,
    private auth: AuthService, public toast: ToastController,
    public loadingCtrl: LoadingController,
    private keyboard: Keyboard
  ) {
    window.addEventListener('keyboardDidShow', () => {
      console.log("Keyboard is Shown");
      this.isKeyboardHide = false;
      this.keyboard.onKeyboardShow().subscribe((value) => {
        document.body.classList.add('hide-on-keyboard-open');
      })
    });
    window.addEventListener('keyboardDidHide', () => {
      // document.body.classList.remove('hide-on-keyboard-open');
      this.isKeyboardHide = true;
      this.keyboard.onKeyboardHide().subscribe((value) => {
        document.body.classList.remove('hide-on-keyboard-open');
      })

    });

  }

  fnLogin() {
    if (this.login.phone != '') {
      if (this.login.password != '') {
        this.requestObject = {
          "phone": this.login.phone,
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
            localStorage.setItem("firm_name", this.dataResponse.data.firm_name);
            localStorage.setItem("name", this.dataResponse.data.name);
            localStorage.setItem("role", this.dataResponse.data.role);
            localStorage.setItem("phone", this.dataResponse.data.phone);
            if(this.dataResponse.data.photo)
            {
              localStorage.setItem("photos", environment.file_url + "assets/uploads/users/" +this.dataResponse.data.photo);
            }else{
              localStorage.setItem("photos", '');
            }

            console.log(this.dataResponse.data);
            console.log('role---',this.dataResponse.data.role);
            console.log('name---',localStorage.getItem('name'));
            if (this.dataResponse.data.role == 'DeliveryBoy') {
              this.navCtrl.navigateForward('my-account');
            } else {
              this.navCtrl.navigateForward('/dashboard');
            }
          } else {
            //this.showToast1();
            this.hideLoader();
            this.auth.showToast('Please enter valid Phone or password');
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
      this.auth.showToast('Enter Phone Number!');
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

import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { environment } from '../../environments/environment'
import { GlobalFooServiceService } from '../global-foo-service.service';
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
  rootPage:any;
  showPass=false;
  deviceToken:any;
  constructor(public navCtrl: NavController,
    public globalFooService:GlobalFooServiceService,
    private auth: AuthService, public toast: ToastController,
    public loadingCtrl: LoadingController,
    private keyboard: Keyboard
  ) {

   
    
/* 
    if(localStorage.getItem('id')){
        this.navCtrl.navigateRoot('/dashboard');
        return;
    } */
/* 
    window.addEventListener('keyboardDidShow', () => {
      console.log("Keyboard is Shown");
      this.isKeyboardHide = false;
      this.keyboard.onKeyboardShow().subscribe((value) => {
        document.body.classList.add('hide-on-keyboard-open');
      })
    });

    window.addEventListener('keyboardDidHide', () => {
      this.isKeyboardHide = true;
      this.keyboard.onKeyboardHide().subscribe((value) => {
        document.body.classList.remove('hide-on-keyboard-open');
      })
    }); */

  }

  ionViewWillEnter(){
    this.deviceToken=localStorage.getItem("device_token")
    console.log(this.deviceToken);
  }
  fnLogin() {
    if (this.login.phone != '') {
      if (this.login.password != '') {
        this.requestObject = {
          "phone": this.login.phone,
          "password": this.login.password,
          "device_token":this.deviceToken
        }
        this.showLoader();
        this.auth.login(this.requestObject).subscribe((data: any) => {
          this.dataResponse = data;
          this.hideLoader();
          if (this.dataResponse.status == true) {
            localStorage.setItem("id", this.dataResponse.data.id);
            localStorage.setItem("email", this.dataResponse.data.email);
            localStorage.setItem("firm_name", this.dataResponse.data.firm_name);
            localStorage.setItem("name", this.dataResponse.data.name);
            localStorage.setItem("role", this.dataResponse.data.role);
            localStorage.setItem("phone", this.dataResponse.data.phone);
            localStorage.setItem("address_id", this.dataResponse.data.address_id);
            localStorage.setItem("area_master_id", this.dataResponse.data.area_master_id);
            if(this.dataResponse.data.photo)
            {
              localStorage.setItem("photos", environment.file_url + "assets/uploads/users/" +this.dataResponse.data.photo);
            }else{
              localStorage.setItem("photos", '');
            }
         
            if (this.dataResponse.data.role == 'DeliveryBoy') {
              this.rootPage='/my-account';
              this.navCtrl.navigateRoot('my-account');
            } else if (this.dataResponse.data.role == 'Salesman') {
              this.rootPage='/sales-dashboard';
              this.navCtrl.navigateRoot('sales-dashboard');
            }else {
              this.navCtrl.navigateRoot('dashboard');
              this.rootPage='/dashboard';
            }
            // window.location.reload();
            this.globalFooService.publishSomeData({
              rootPage:this.rootPage,
              name: this.dataResponse.data.name,
              role:this.dataResponse.data.role,
              email:this.dataResponse.data.email,
              photo:this.dataResponse.data.photo?environment.file_url + "assets/uploads/users/" +this.dataResponse.data.photo:''
          });

          } else {
            this.hideLoader();
            this.auth.showToastLong(this.dataResponse.message);
          }
        }, (err) => {
          console.log("Error=>", err);
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
  fnShowPass(){
      this.showPass=!this.showPass;
  }

  hideLoader() {
    this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  requestObject: any;
  email: any;
  public myToast: any;
  dataResponse: any;
  constructor(private location: Location,public navCtrl: NavController, private auth: AuthService, public toast: ToastController,
  ) {
    
    this.email = localStorage.getItem("email");
    console.log(this.email);
  }

  ngOnInit() {
     this.email='';
  }
  goBack() {
    this.location.back();
  }
  fnSend() {

    if (this.email != '') {
      localStorage.setItem('email', this.email);
      this.requestObject = {
        "email": this.email
      };
      console.log(this.requestObject);
      //this.navCtrl.navigateForward('/otp');
      this.auth.forgotPassword(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.dataResponse = data;
        if (this.dataResponse.status == true) {

          this.navCtrl.navigateForward('/otp');
        } else {
          this.showToast1();

        }
      }, (err) => {
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });
    } else {
      this.showToast();
    }

  }
  showToast() {
    this.myToast = this.toast.create({
      message: 'Enter Email',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  showToast1() {
    this.myToast = this.toast.create({
      message: 'Something went wrong.Please try again later',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
}

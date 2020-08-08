import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  email: any;
  requestObject: any;
  public verifyOtp: string;
  public myToast: any;
  dataResponse: any;

  constructor(private location: Location,public navCtrl: NavController, private auth: AuthService, public toast: ToastController) { }

  ngOnInit() {
    // this.email = localStorage.getItem("email");

    this.verifyOtp = "";
    this.email = localStorage.getItem('email');
    console.log(this.email);
  }
  verificationOtp() {

    if (this.verifyOtp != '') {
      this.requestObject = {
        "email": this.email,
        "otp": this.verifyOtp,
      };
      console.log(this.requestObject);
      //this.navCtrl.navigateForward('/update-password');
      this.auth.showLoader();
      this.auth.checkOtp(this.requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        console.log(data);
        this.dataResponse = data;
       
        if (this.dataResponse.status == true) {
         
          this.navCtrl.navigateForward('/update-password');

        } else {
          this.showToast1();
        }

      }, (err) => {
        this.auth.hideLoader();
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });

    } else {
      this.showToast();
    }

  }
  goBack() {
    this.location.back();
  }
  showToast() {
    this.myToast = this.toast.create({
      message: 'Enter OTP',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  showToast1() {
    this.myToast = this.toast.create({
      message: 'invalid otp',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  requestObject: any;
  email: any;
  private myToast: any;
  constructor(public navCtrl: NavController, private auth: AuthService, public toast: ToastController,
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    console.log(this.email);
  }

  fnSend() {
    if (this.email != '') {
      this.requestObject = {
        "email": this.email
      };
      console.log(this.requestObject);
      this.auth.forgotPassword(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.navCtrl.navigateForward('/otp');

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
      message: 'Enter email',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
}

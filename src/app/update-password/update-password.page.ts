import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {
  requestObject: any;
  user_id: any;
  newPass: any;
  confirmPass: any;
  public myToast: any;
  email: any;
  dataResponse: any;

  constructor(public navCtrl: NavController, public menu: MenuController, private auth: AuthService, public toast: ToastController) { }

  ngOnInit() {
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

    this.email = localStorage.getItem('email');
    console.log(this.email);

  }
  fnSubmit() {

    if (this.email != '' && this.newPass != '' && this.confirmPass != '') {
      // alert();
      this.requestObject = {
        "email": this.email,
        "password": this.confirmPass
      };
      console.log(this.requestObject);
      this.auth.updatePassword(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.dataResponse = data;

        if (this.dataResponse.status == true) {

          this.navCtrl.navigateForward('/home');
          
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
      message: 'Please Enter New Password & Confirm Password',
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

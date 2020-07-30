import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  ionicForm: FormGroup;
  requestObject: any;
  user_id: any;
  newPass: any;
  oldPass: any;
  public myToast: any;
  dataResponse: any;

  constructor(public navCtrl: NavController, public formbulider: FormBuilder, public menu: MenuController, private auth: AuthService, public toast: ToastController) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

    this.ionicForm = this.formbulider.group({
      oldPass: ['', [Validators.required, Validators.minLength(6)]],
      newPass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  fnChangePassword() {
    if (this.oldPass != '' && this.newPass != '') {
      this.requestObject = {
        "user_id": this.user_id,
        "old_password": this.oldPass,
        "password": this.newPass
      };
      console.log(this.requestObject);
      this.auth.changePassword(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.dataResponse = data;
        if (this.dataResponse.status == true) {

          this.navCtrl.navigateForward('/home');
        }
        else {
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
      message: 'Please Enter New Password & Old Password',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  showToast1() {
    this.myToast = this.toast.create({
      message: 'Old password not match ',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

}

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
      this.auth.showLoader();
      console.log(this.requestObject);
      this.auth.changePassword(this.requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        console.log(data);
        this.dataResponse = data;
        if (this.dataResponse.status == true) {

          this.navCtrl.navigateForward('/dashboard');
        }
        else {
          this.auth.showToast('Old password not match ');
        }
      }, (err) => {
        this.auth.hideLoader();
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });

    } else {
      this.auth.showToast('Please Enter New Password & Old Password');
    }
  }

  fnBackToYourCart() {
    this.navCtrl.navigateForward('dashboard');
  }
}

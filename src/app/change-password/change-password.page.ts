import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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
  role:any;

  constructor(
    private location: Location,public navCtrl: NavController, public formbulider: FormBuilder, public menu: MenuController, private auth: AuthService, public toast: ToastController) {
    this.menu.enable(true);

    this.role = localStorage.getItem("role");
    console.log(this.role);
  }

  ngOnInit() {
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

    this.ionicForm = this.formbulider.group({
      oldPass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }
  fnChangePassword() {
    
    if (
      this.oldPass != null && 
       this.newPass != null
       ) {
      this.auth.showLoader();
      // if (this.newPass.length >= 6 && this.oldPass.length >=6) {
      this.requestObject = {
        "user_id": this.user_id,
        "old_password": this.oldPass,
        "password": this.newPass
      };
  // console.log(this.requestObject);
      this.auth.changePassword(this.requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        //  console.log(data);
        this.dataResponse = data;
        if (this.dataResponse.status == true) {
          if (this.role == 'Customer') {
            this.navCtrl.navigateRoot('/dashboard');
            this.auth.showToast('Password Successfully Updated ');

          } else if(this.role == 'DeliveryBoy'){
            this.navCtrl.navigateRoot('/my-account');
            this.auth.showToast('Password Successfully Updated ');
          } else if(this.role == 'Salesman'){
            this.navCtrl.navigateRoot('/sales-dashboard');
            this.auth.showToast('Password Successfully Updated ');
          }
          else{
            this.auth.showToast('Password Not update ');
          }
          //this.auth.showToast('Password Successfully Updated ');
          //this.navCtrl.navigateForward('/dashboard');
        }
        else {
          this.auth.showToast('Old password not match ');
        }
      }, (err) => {
        this.auth.hideLoader();
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });

    // } else {
    //   this.auth.showToast('Please Enter Old Password & New Password should be 6 digits');
    // }
  }else{
    console.log("please enter all fields")
    this.auth.showToast('Please enter old & new password');
  }
  }

  fnBackToYourCart() {
    if (this.role == 'Customer') {
      this.navCtrl.navigateRoot('/dashboard');
    }else if(this.role == 'Salesman'){
      this.navCtrl.navigateRoot('/sales-dashboard');
    } else {
      this.navCtrl.navigateRoot('/my-account');
    }
  }
  goBack() {
    this.location.back();
  }
}

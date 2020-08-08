import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
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

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private location: Location,
    private auth: AuthService,
    public toast: ToastController) {
     this.email= localStorage.getItem('email');
  }

  ngOnInit() {
  }
  fnSubmit() {
    if (this.email != undefined && this.newPass != undefined && this.confirmPass != undefined) {

     if (this.email != '' && this.newPass != '' && this.confirmPass != '') {
       console.log(this.email);
       console.log(this.newPass);
       console.log(this.confirmPass);
       
       this.requestObject = {
         "email": localStorage.getItem('email'),
         "password": this.confirmPass
       };
       this.auth.showLoader();
       console.log(this.requestObject);
       this.auth.updatePassword(this.requestObject).subscribe((data: any) => {
         this.auth.hideLoader();
         console.log(data);
         this.dataResponse = data;
         if (this.dataResponse.status == true) {
           this.navCtrl.navigateForward('/home');
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
    }else{
      this.showToast();
    }
  }
  goBack() {
    this.location.back();
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

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login = { username: "", password: "" };
  requestObject: any;
  dataResponse: any;
  constructor(public navCtrl: NavController, public apiService: ApiService,
    private auth: AuthService ) { }

  fnSignUp() {
    this.navCtrl.navigateForward('register');
  }

  fnLogin() {
    // if (this.login.username && this.login.password) {

    //   this.requestObject = {
    //     "username": this.login.username,
    //     "password": this.login.password
    //   }
    //   console.log(JSON.stringify(this.requestObject));

    //   this.auth.login(this.requestObject).subscribe((data: any) => {
    //      console.log(data);
        
       
    //   }, (err) => {
    //     console.log("not logged");
    //     //this.auth.showError(err.error.message);
    //   });

      // this.apiService.createItem(this.requestObject).subscribe((response) => {
      //   this.dataResponse = response;
      //   if (this.dataResponse.status == true) {
      //     console.log("login data", this.dataResponse);
      //     this.navCtrl.navigateForward('/dashboard');
      //     console.log("logged successfully");

      //     // for (let obj of this.dataResponse.response) {
      //     //   //localStorage.setItem("first_name", obj.first_name);
      //     //   localStorage.setItem("username", obj.username);
      //     //   localStorage.setItem("password", obj.password);
      //     //   this.navCtrl.navigateForward('/dashboard');
      //     //   console.log("logged successfully");
      //     // }
      //   } else {

      //   }

      // });
    

  }

  fnForgotPassword() {
    this.navCtrl.navigateForward('forgot-password');

  }
}

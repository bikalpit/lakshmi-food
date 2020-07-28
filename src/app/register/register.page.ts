import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  confirm_password:any;
  register = { username: "", email: "", password: "" ,confirm_password:""}
  requestObject: any;
  user_info: any;
  dataResponse: any;

  constructor(public navCtrl: NavController,public apiService: ApiService) { }

  ngOnInit() {
  }
  fnLogin() {
    // if (this.register.username != "" && this.register.email != "" && this.register.password != "" && this.confirm_password != "") {

    //   this.requestObject = {

    //     "username": this.register.username,
    //     "email": this.register.email,
    //     "password": this.register.password,
    //     "role":"Customer"
    //   };
    //   //onsole.log(this.register.plan_id);
    //   console.log(JSON.stringify(this.requestObject));
    //   this.apiService.createItem(this.requestObject).subscribe((response) => {
    //     this.dataResponse = response;
    //     console.log(this.dataResponse);
    //     if (this.dataResponse.status == true) {
    //       //console.log(JSON.stringify(res));
    //       console.log("Successfully");
          this.navCtrl.navigateForward('/home');

      //   } else {

      //   }

      // });


    //}
   
  }
}

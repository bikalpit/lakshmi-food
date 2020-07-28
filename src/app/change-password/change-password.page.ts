import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  requestObject: any;
  user_id:any;
  newPass:any;
  oldPass:any;
    constructor(public navCtrl: NavController,public menu: MenuController,private auth: AuthService) {
    this.menu.enable(true);
    
   }

  ngOnInit() {
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);
  }
  fnChangePassword(){
    this.requestObject = {
      "user_id": this.user_id,
      "old_password" : this.oldPass,
      "password": this.newPass   
    };
    console.log(this.requestObject);
    this.auth.changePassword(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.navCtrl.navigateForward('/home');

    }, (err) => {
      console.log("Error=>",err);
      //this.auth.showError(err.error.message);
    });
    

  }
}

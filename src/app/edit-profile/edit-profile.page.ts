import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileData: any;
  user_id: any;
  requestObject: any;
  dataResponse: any;
  AllUserArray: any;
  public myToast: any;
  user_id1: any;

  constructor(public navCtrl: NavController, public menu: MenuController, private auth: AuthService, public toast: ToastController) {
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

    this.user_id1 = localStorage.getItem("user_id");
    console.log(this.user_id1);
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {

    this.requestObject = {
      "user_id": this.user_id,
    }
    console.log(this.requestObject);

    this.auth.getUsersDetails(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.AllUserArray = data.data;
      console.log("data--->", this.AllUserArray);

    }, (err) => {
      console.log("Error=>", err);
      //this.auth.showError(err.error.message);
    });
  }

  fnSave() {
    if (this.AllUserArray.name != '' && this.AllUserArray.email != '' && this.AllUserArray.username != '' && this.AllUserArray.password != '') {
      this.requestObject = {
        "user_id": this.user_id,
        "name": this.AllUserArray.name,
        "email": this.AllUserArray.email,
        "username": this.AllUserArray.username
      };
      console.log(this.requestObject);
      this.auth.editProfile(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.AllUserArray = data;
        if (this.AllUserArray.status == true) {
          //this.navCtrl.navigateForward('/home');
          this.auth.showToast('Profile update successfully');
        } else {
          this.auth.showToast('Profile Not update ');
        }
      }, (err) => {
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });
    } else {
      this.auth.showToast('Please fillup all fields');
    }
  }

  fnCancelOrder() {
    this.navCtrl.navigateForward('my-account');
  }


}

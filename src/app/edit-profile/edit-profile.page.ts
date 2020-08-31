import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  ionicForm: FormGroup;
  profileData: any;
  user_id: any;
  requestObject: any;
  dataResponse: any;
  AllUserArray: any;
  public myToast: any;
  user_id1: any;
  role: any

  constructor(public formbulider: FormBuilder, public navCtrl: NavController, public menu: MenuController, private auth: AuthService, public toast: ToastController) {
    this.menu.enable(true);
    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

    this.user_id1 = localStorage.getItem("user_id");
    console.log(this.user_id1);

    this.role = localStorage.getItem("role");
    console.log(this.role);

    this.ionicForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      UserName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {

    this.requestObject = {
      "user_id": this.user_id,
    }
    console.log(this.requestObject);
    this.auth.showLoader();
    this.auth.getUsersDetails(this.requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      console.log(data);
      this.AllUserArray = data.data;
      console.log("data--->", this.AllUserArray);
      this.ionicForm.controls.Name.setValue(this.AllUserArray.name);
      this.ionicForm.controls.Email.setValue(this.AllUserArray.email);
      this.ionicForm.controls.UserName.setValue(this.AllUserArray.username);

    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }

  fnSave() {

    if (this.ionicForm.invalid) {
      console.log('invalid');
      this.ionicForm.get('Name').markAllAsTouched();
      this.ionicForm.get('Email').markAsTouched();
      this.ionicForm.get('UserName').markAsTouched();
      return false;
    }
    console.log('ok');
    this.requestObject = {
      "user_id": this.user_id,
      "name":  this.ionicForm.get('Name').value,
      "email": this.ionicForm.get('Email').value,
      "username":this.ionicForm.get('UserName').value,
    };
    console.log(this.requestObject);
    this.auth.showLoader();
    console.log(this.requestObject);
    this.auth.editProfile(this.requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      console.log(data);
      this.AllUserArray = data;
      if (this.AllUserArray.status == true) {
        if (this.role == 'Customer') {
          this.navCtrl.navigateForward('dashboard');
          this.auth.showToast('Profile update successfully');

        } else if (this.role == 'DeliveryBoy') {
          this.navCtrl.navigateForward('my-account');
          this.auth.showToast('Profile update successfully');
        }
        else {
          this.auth.showToast('Profile Not update ');
        }
      } else {
        this.auth.showToast('Profile Not update ');
      }
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });

  }

  fnCancelOrder() {
    if (this.role == 'Customer') {
      this.navCtrl.navigateForward('dashboard');
    } else {
      this.navCtrl.navigateForward('my-account');
    }

  }
  fnBackToYourCart() {
    if (this.role == 'Customer') {
      this.navCtrl.navigateForward('dashboard');
    } else {
      this.navCtrl.navigateForward('my-account');
    }
  }
}

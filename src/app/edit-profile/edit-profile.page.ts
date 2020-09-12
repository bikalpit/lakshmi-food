import { Component, OnInit, } from '@angular/core';
import { NavController, ToastController, ActionSheetController, MenuController, Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  role: any;
  base64Image: any;
  photos: any;
  selectImage: Boolean = false;

  constructor(private camera: Camera, private platform: Platform, public actionsheetCtrl: ActionSheetController, public formbulider: FormBuilder, public navCtrl: NavController, public menu: MenuController, private auth: AuthService, public toast: ToastController) {
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
      this.photos = "http://laxmifoods.bi-team.in/assets/uploads/users/" + this.AllUserArray.photo;
      this.ionicForm.controls.Name.setValue(this.AllUserArray.name);
      this.ionicForm.controls.Email.setValue(this.AllUserArray.email);
      this.ionicForm.controls.UserName.setValue(this.AllUserArray.firm_name);

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
      "name": this.ionicForm.get('Name').value,
      "email": this.ionicForm.get('Email').value,
      "firm_name": this.ionicForm.get('UserName').value,
      "image": this.base64Image !== '' ? this.base64Image : '',
    };
    console.log(this.requestObject);
    this.auth.showLoader();
    console.log(this.requestObject);
    this.auth.editProfile(this.requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      console.log(data);
      this.AllUserArray = data;
      if (this.AllUserArray.status == true) {
        window.location.reload();
        if (this.AllUserArray.data.photo) {
          localStorage.setItem("photos", "http://laxmifoods.bi-team.in/assets/uploads/users/" + this.AllUserArray.data.photo);
        } else {
          localStorage.setItem("photos", '');
        }
        if (this.role == 'Customer') {
          this.navCtrl.navigateForward('/dashboard');
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
  async presentActionSheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Please Select',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Take photo',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera-outline' : 'camera-outline',
          handler: () => {
            this.captureImage(false);
          }
        },
        {
          text: 'Choose photo from Gallery',
          icon: !this.platform.is('ios') ? 'images-outline' : 'mages-outline',
          handler: () => {
            this.captureImage(true);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async captureImage(useAlbum: boolean) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      ...useAlbum ? { sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM } : {}
    }

    const imageData = await this.camera.getPicture(options);

    this.base64Image = `data:image/jpeg;base64,${imageData}`;
    console.log(this.base64Image);

    this.photos = this.base64Image;
    if (this.base64Image) {
      this.selectImage = true;
    } else {
      this.selectImage = false;
    }
  }

}

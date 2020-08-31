import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  ionicForm: FormGroup;
  requestObject: any;
  user_id: any;
  type: any;
  public data: any;
  dataResponse: any;
  public myToast: any;
  onlynumeric = /^-?(0|[1-9]\d*)?$/
  home:any;

  constructor(public formbulider: FormBuilder,
    private location: Location,
    public navCtrl: NavController,
    private auth: AuthService,
    public toast: ToastController) {

    this.user_id = localStorage.getItem("id");
    this.ionicForm = this.formbulider.group({
      houseNo: ['', [Validators.required]],
      AreaColony: ['', [Validators.required]],
      State: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      City: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      Landmark: ['', [Validators.required]],
      MobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.onlynumeric)]],
      Zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(this.onlynumeric)]]
    });
  }

  ngOnInit() {
  }

  onChangeHandler(event) {
    this.data = event.target.value;
  }

  goBack() {
    this.location.back();
  }
  fnSaveAddress() {

    if (this.ionicForm.invalid) {
      console.log('invalid');
      this.ionicForm.get('houseNo').markAllAsTouched();
      this.ionicForm.get('AreaColony').markAsTouched();
      this.ionicForm.get('State').markAsTouched();
      this.ionicForm.get('City').markAllAsTouched();
      this.ionicForm.get('Landmark').markAsTouched();
      this.ionicForm.get('MobileNo').markAsTouched();
      this.ionicForm.get('Zipcode').markAsTouched();
      return false;
    }
    this.requestObject = {
      "house_no":  this.ionicForm.get('houseNo').value,
      "area":  this.ionicForm.get('AreaColony').value,
      "city":  this.ionicForm.get('City').value,
      "state":  this.ionicForm.get('State').value,
      "landmark": this.ionicForm.get('Landmark').value,
      "zipcode":  this.ionicForm.get('Zipcode').value,
      "mobile_no": this.ionicForm.get('MobileNo').value,
      "user_id": this.user_id,
      "address_type": this.data
    };
    console.log(this.requestObject);
    this.auth.showLoader();
    this.auth.addAddress(this.requestObject).subscribe((data: any) => {
      this.dataResponse = data;
      console.log(this.dataResponse);
      this.auth.hideLoader();
      if (this.dataResponse.status == true) {
        this.auth.showToast('Save address successfully');
        this.navCtrl.navigateForward('select-address');
      }
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }
}

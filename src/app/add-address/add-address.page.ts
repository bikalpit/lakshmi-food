import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  requestObject: any;
  house_no: any;
  city: any;
  state: any;
  landmark: any;
  user_id: any;
  type: any;
  mobile_no: any;
  name: any;
  area: any;
  zipcode:any;
  public data: any;
  dataResponse: any;
  public myToast: any;

  constructor(private location: Location,public navCtrl: NavController, private auth: AuthService, public toast: ToastController) {

    this.user_id = localStorage.getItem("id");

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
    
    if (this.house_no != '' && this.city != '' && this.state != '' && this.landmark != '' && this.mobile_no != '' && this.area != '' && this.name != '' && this.zipcode != '') {
      this.requestObject = {

        "house_no": this.house_no,
        "city": this.city,
        "state": this.state,
        "landmark": this.landmark,
        "zipcode": this.zipcode,
        "mobile_no": this.mobile_no,
        "user_id": this.user_id,
        "address_type": this.data

      };

      this.auth.addAddress(this.requestObject).subscribe((data: any) => {
        this.dataResponse = data;
        console.log(this.dataResponse);
        if(this.dataResponse.status == true){
          this.auth.showToast('Save address successfully');
        }

      }, (err) => {
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });

    } else {
      this.auth.showToast('Please fillup all fields');
    }

  }

}

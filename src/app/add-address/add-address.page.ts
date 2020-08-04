import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

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
  public data: any;
  dataResponse: any;
  public myToast: any;

  constructor(public navCtrl: NavController, private auth: AuthService, public toast: ToastController) {

    this.user_id = localStorage.getItem("id");
    console.log(this.user_id);

  }

  ngOnInit() {
  }

  onChangeHandler(event) {
    console.log(event);
    this.data = event.target.value;
  }

  fnSaveAddress() {
    if (this.house_no != '' && this.city != '' && this.state != '' && this.landmark != '' && this.mobile_no != '' && this.area != '' && this.name != '') {
      this.requestObject = {

        "house_no": this.house_no,
        "city": this.city,
        "state": this.state,
        "landmark": this.landmark,
        "zipcode": "395006",
        "mobile_no": this.mobile_no,
        "user_id": this.user_id,
        "address_type": "house"

      };

      console.log(this.requestObject);
      this.auth.addAddress(this.requestObject).subscribe((data: any) => {
        console.log(data);
       
        console.log("add successfully");
        
        this.auth.showToast('Save address successfully');
     
      }, (err) => {
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });

    } else {
      this.auth.showToast('Please fillup all fields');
    }

  }

}

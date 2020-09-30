import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  user_id: any;
  requestObject: any;
  AllAddressArray: any;
  data: any;
  id: any;
  sub: any;
  regex = /^[A-z]+$/;  

  constructor(private location: Location,
    public navCtrl: NavController, 
    private route: ActivatedRoute, 
    private auth: AuthService, 
    private router: Router) {


    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.AllAddressArray = state;
      console.log("Address data-->", this.AllAddressArray);
    }
  }

  ngOnInit() {

  }
  goBack() {
    this.location.back();
  }
  fnSaveAddress() {
   
   

    if (this.AllAddressArray.address_house_no != '' && this.AllAddressArray.area !=''
      && this.AllAddressArray.address_landmark != ''
      && this.AllAddressArray.address_city != ''
      && this.AllAddressArray.address_state != ''
      && this.AllAddressArray.address_zipcode != '' && this.AllAddressArray.address_type != '') {
        if (!this.regex.test(this.AllAddressArray.address_city) && !this.regex.test(this.AllAddressArray.address_state)) {
          console.log("Entered char is not alphabet");
          this.auth.showToast('Entered City or State is not alphabet');
        }else{
          console.log("OK");
          this.requestObject = {
            "address_user_id": this.AllAddressArray.address_user_id,
            "house_no": this.AllAddressArray.address_house_no,
            "area" : this.AllAddressArray.address_area,
            "city": this.AllAddressArray.address_city,
            "state": this.AllAddressArray.address_state,
            "landmark": this.AllAddressArray.address_landmark,
            "zipcode": this.AllAddressArray.address_zipcode,
            "mobile_no": this.AllAddressArray.address_mobile_no,
            "address_type": this.AllAddressArray.address_type,
            "address_id": this.AllAddressArray.id
    
          };
          this.auth.showLoader();
    
          this.auth.editAddress(this.requestObject).subscribe((data: any) => {
            this.auth.hideLoader();
            this.auth.showToast('Updated address successfully');
            this.navCtrl.navigateForward('/select-address');
          }, (err) => {
            console.log("Error=>", err);
            this.auth.hideLoader();
          });
        }
    } else {
      this.auth.showToast('Please fillup all fields');
    }
  }
}

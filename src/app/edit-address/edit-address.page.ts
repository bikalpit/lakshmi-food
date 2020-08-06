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

  constructor(private location: Location, public navCtrl: NavController, private route: ActivatedRoute, private auth: AuthService, private router: Router) {
    //     this.sub = this.route.params.subscribe(params => {
    //       this.id = params['id']; 
    //       console.log(this.id);
    //  });

    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.AllAddressArray = state;
      console.log("cart data-->", this.AllAddressArray);
    }
  }

  ngOnInit() {

  }
  goBack() {
    this.location.back();
  }
  fnSaveAddress() {

    if (this.AllAddressArray.address_house_no != '' && this.AllAddressArray.area !='' && this.AllAddressArray.address_city != ''
      && this.AllAddressArray.address_state != '' && this.AllAddressArray.address_landmark != ''
      && this.AllAddressArray.address_zipcode != '' && this.AllAddressArray.address_type != '') {

      this.requestObject = {
        "address_user_id": this.AllAddressArray.address_user_id,
        "house_no": this.AllAddressArray.address_house_no,
        "area" : this.AllAddressArray.area,
        "city": this.AllAddressArray.address_city,
        "state": this.AllAddressArray.address_state,
        "landmark": this.AllAddressArray.address_landmark,
        "zipcode": this.AllAddressArray.address_zipcode,
        "mobile_no": this.AllAddressArray.address_mobile_no,
        "address_type": this.AllAddressArray.address_type
      
      };

      console.log(this.requestObject);
      this.auth.editAddress(this.requestObject).subscribe((data: any) => {
        console.log(data);
        this.AllAddressArray = data;

        this.auth.showToast('Updated address successfully');
        this.navCtrl.navigateForward('/select-address');

      }, (err) => {
        console.log("Error=>", err);


      });
    } else {

      this.auth.showToast('Please fillup all fields');

    }
  }
}

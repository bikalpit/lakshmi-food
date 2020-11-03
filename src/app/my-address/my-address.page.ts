import { Component, OnInit } from '@angular/core';
import { NavController,AlertController,MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.page.html',
  styleUrls: ['./my-address.page.scss'],
})
export class MyAddressPage implements OnInit {
  role: any;
  user_id:any;
  dataResponse: any;
  addressList = [];
  constructor(
    private location: Location,
    private auth: AuthService,
    public navCtrl: NavController,
    public menu: MenuController, ) { 
    this.menu.enable(true);
    this.role = localStorage.getItem("role");
    this.user_id = localStorage.getItem("id");
    console.log(this.role);
  }

  ngOnInit() {
    this.fngetAddressDetails();
  }
  fnBack(){
    if (this.role == 'Customer') {
      this.navCtrl.navigateRoot('/dashboard');
    }else if(this.role == 'Salesman'){
      this.navCtrl.navigateRoot('/sales-dashboard');
    } else {
      this.navCtrl.navigateRoot('/my-account');
    }
    // this.location.back();
  }


  fngetAddressDetails() {
    let requestObject = {
      "user_id": this.user_id
    }
    this.auth.showLoader();
    this.auth.getAddressList(requestObject).subscribe((data: any) => {
      this.auth.hideLoader();
      this.dataResponse = data.data;
      this.addressList = this.dataResponse;
     
      console.log('addressList - > ',this.addressList);
    }, (err) => {
      console.log("Error=>", err);
      this.auth.hideLoader();
    });
  }
  updateAddress(data) {
    console.log(data);
    this.navCtrl.navigateForward('edit-address', { state: {data:data,from:'0'} });
  }
}

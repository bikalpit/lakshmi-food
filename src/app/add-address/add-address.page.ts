import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'office',
      text: 'One',
      disabled: false,
      checked: true,
      color: 'danger'

     }, 
    ];
    radio_list1 = [
    {
      id: '1',
      name: 'radio_list',
      value: 'home',
      text: 'Two',
      disabled: false,
      checked: false,
      color: 'danger'

    }
     ];
     radio_list2 = [
      {
      id: '1',
      name: 'radio_list',
      value: 'other',
      text: 'Three',
      disabled: false,
      checked: false,
      color: 'danger'
    }
  ];
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  fnSaveAddress(){
    this.navCtrl.navigateForward('select-address');

  }
  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }

 
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
 
}

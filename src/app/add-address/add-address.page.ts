import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const RES_DATA = {
  taxpayerInfo: {
    ctjCd: 'ZD1102',
    stj: 'Mukatsar - Ward No.5',
    pradr: {
      addr: {
        city: '',
        bno: '1915',
        flno: '',
        loc: 'GIDDERBAHA',
        st: 'STREET NO. 02',
        lg: '',
        dst: 'Muktsar',
        stcd: 'Punjab',
        lt: '',
        bnm: 'SHAHEED BHAGAT SINGH NAGAR',
        pncd: '152101',
      },
      ntr: 'Export',
    },
    dty: 'Regular',
    frequencyType: null,
    errorMsg: null,
    tradeNam: 'BROADVIEW INNOVATIONS PRIVATE LIMITED',
    rgdt: '02/11/2018',
    adadr: [],
    nba: ['Export'],
    cxdt: '',
    ctj: 'GIDDERBAHA',
    sts: 'Active',
    stjCd: 'PB165',
    ctb: 'Private Limited Company',
    gstin: '03AAFCB3420K1Z3',
    lgnm: 'BROADVIEW INNOVATIONS PRIAVATE LIMITED',
    panNo: 'AAFCB3420K',
  },
  filing: [],
  compliance: {
    filingFrequency: null,
  },
};

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
  home: any;
  timer: any;
  gstText: any;
  fetchGst: any;


  constructor(public formbulider: FormBuilder,
    private location: Location,
    public navCtrl: NavController,
    private auth: AuthService,
    public toast: ToastController) {

    this.user_id = localStorage.getItem("id");
    this.ionicForm = this.formbulider.group({
     /*  GSTNo: ['', [Validators.required]], */
      houseNo: ['', [Validators.required]],
      AreaColony: ['', [Validators.required]],
      State: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      City: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
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

  GSTFetch() {
    // let dd = this.ionicForm.get('GSTNo').value
    let dd = this.gstText;
    if (this.fetchGst) clearTimeout(this.fetchGst);
    this.fetchGst = setTimeout(() => {
      console.log(dd);
      this.fnGetGST(dd)
    }, 1000);
  }

  fnGetGST(gst) {

    if (gst.length < 14) {
      return false;
    }

    this.auth.showLoader();
    this.auth.getAddressFromGst(gst).subscribe((data: any) => {
      this.auth.hideLoader();
      if (data.error === true) {
        this.auth.showToast(data.message);
      } else {
        this.ionicForm.setValue({
         /*  GSTNo: gst, */
          houseNo: data.taxpayerInfo.pradr.addr.bnm,
          AreaColony: data.taxpayerInfo.pradr.addr.flno,
          Landmark: data.taxpayerInfo.pradr.addr.st,
          Zipcode: data.taxpayerInfo.pradr.addr.pncd,
          City: data.taxpayerInfo.pradr.addr.dst,
          State: data.taxpayerInfo.pradr.addr.stcd,
          MobileNo: '',
        });
      }
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }

  goBack() {
    this.location.back();
  }

  fnSaveAddress() {

    if (this.ionicForm.invalid) {
      console.log('invalid');
     // this.ionicForm.get('GSTNo').markAllAsTouched();
      this.ionicForm.get('houseNo').markAsTouched();
      this.ionicForm.get('AreaColony').markAsTouched();
      this.ionicForm.get('State').markAsTouched();
      this.ionicForm.get('City').markAsTouched();
      this.ionicForm.get('Landmark').markAsTouched();
      this.ionicForm.get('MobileNo').markAsTouched();
      this.ionicForm.get('Zipcode').markAsTouched();
      return false;
    }
    console.log('OK');
     this.requestObject = {
       "house_no": this.ionicForm.get('houseNo').value,
       "area": this.ionicForm.get('AreaColony').value,
       "city": this.ionicForm.get('City').value,
       "state": this.ionicForm.get('State').value,
       "landmark": this.ionicForm.get('Landmark').value,
       "zipcode": this.ionicForm.get('Zipcode').value,
       "mobile_no": this.ionicForm.get('MobileNo').value,
       "user_id": this.user_id,
       "gst_no":this.gstText,
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

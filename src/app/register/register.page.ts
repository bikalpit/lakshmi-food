import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
//import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Location} from '@angular/common';

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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicForm: FormGroup;
  register = { fullname: "", username: "", email: "", phone: "", password: "", confirm_password: "",houseNo: "" ,AreaColony:"",State:"",City:"",Landmark:"",Zipcode:""}
  requestObject: any;
  onlynumeric = /^-?(0|[1-9]\d*)?$/
  isSubmitted = false;
  public myToast: any;
  dataResponse: any;
  isKeyboardHide = true;
  emailFormat = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  gstText:any;
  fetchGst: any;
  constructor(public navCtrl: NavController, private auth: AuthService,
    private keyboard: Keyboard,
    public formbulider: FormBuilder,
    public toast: ToastController,
    private location: Location,
  ) {
    window.addEventListener('keyboardDidShow', () => {
      console.log("Keyboard is Shown");
      this.isKeyboardHide = false;
      // document.body.classList.add('hide-on-keyboard-open');
      this.keyboard.onKeyboardShow().subscribe((value) => {
        document.body.classList.add('hide-on-keyboard-open');
      })
    });
    window.addEventListener('keyboardDidHide', () => {
      // document.body.classList.remove('hide-on-keyboard-open');
      this.isKeyboardHide = true;
      this.keyboard.onKeyboardHide().subscribe((value) => {
        document.body.classList.remove('hide-on-keyboard-open');
      })

    });

    this.ionicForm = this.formbulider.group({
      username: ['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      fullname: ['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
       houseNo: ['', [Validators.required]],
      AreaColony: ['', [Validators.required]],
      State: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      City: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Landmark: ['', [Validators.required]],
      Zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6),Validators.pattern(this.onlynumeric)]]
    });

  }

  ngOnInit() { }

  fnLogin() {

    if (this.ionicForm.invalid) {
      console.log('invalid');
      this.ionicForm.get('fullname').markAllAsTouched();
      this.ionicForm.get('email').markAsTouched();
      this.ionicForm.get('phone').markAsTouched();
      this.ionicForm.get('username').markAsTouched();
      this.ionicForm.get('password').markAsTouched();
      this.ionicForm.get('confirm_password').markAsTouched();
      this.ionicForm.get('houseNo').markAsTouched();
      this.ionicForm.get('AreaColony').markAsTouched();
      this.ionicForm.get('Landmark').markAsTouched();
      this.ionicForm.get('City').markAsTouched();
      this.ionicForm.get('State').markAsTouched();
      this.ionicForm.get('Zipcode').markAsTouched();
      return false;
    }
    console.log('ok');
    this.requestObject = {
      "fullname": this.register.fullname,
      "firm_name": this.register.username,
      "email": this.register.email,
      "phone": this.register.phone,
      "password": this.register.password,
      "address": this.register.houseNo,
      "area": this.register.AreaColony,
      "landmark": this.register.Landmark,
      "city": this.register.City,
      "state": this.register.State,
      "zipcode": this.register.Zipcode,
      "role" : "Customer"
    }
    console.log(this.requestObject);
    if (this.register.password === this.register.confirm_password) {
      console.log('ok');
      this.auth.showLoader();
      this.auth.signup(this.requestObject).subscribe((data: any) => {
        this.auth.hideLoader();
        console.log(data);
        this.dataResponse = data;
        if (this.dataResponse.status == true) {
          this.auth.showToast('Registration Successfully');
          this.navCtrl.navigateForward('/home');
        } else {
          this.auth.showToast(this.dataResponse.message);
        }
      }, (err) => {
        this.auth.hideLoader();
        console.log("Error=>", err);
      });
    } else {
      this.auth.showToast('Enter confirm password same as password!');
    }
  }
  showToast() {
    this.myToast = this.toast.create({
      message: 'Please fillup all fields',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  fnSignIn() {
    this.navCtrl.navigateRoot('home');
  }
  GSTFetch() {
    // let dd = this.ionicForm.get('GSTNo').value
    let dd = this.gstText;
    if (this.fetchGst) clearTimeout(this.fetchGst);
    this.fetchGst = setTimeout(() => {
      console.log(dd);
     this.fnGetGST(dd)

     /*  this.register.houseNo=RES_DATA.taxpayerInfo.pradr.addr.bnm;
      this.register.AreaColony=RES_DATA.taxpayerInfo.pradr.addr.flno;
      this.register.City=RES_DATA.taxpayerInfo.pradr.addr.dst;
      this.register.fullname=RES_DATA.taxpayerInfo.lgnm;
      this.register.username=RES_DATA.taxpayerInfo.tradeNam;
 */

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
       /*  this.ionicForm.setValue({
          GSTNo: gst,
          houseNo: data.taxpayerInfo.pradr.addr.bnm,
          AreaColony: data.taxpayerInfo.pradr.addr.flno,
          Landmark: data.taxpayerInfo.pradr.addr.st,
          Zipcode: data.taxpayerInfo.pradr.addr.pncd,
          City: data.taxpayerInfo.pradr.addr.dst,
          State: data.taxpayerInfo.pradr.addr.stcd,
          phone: '',
        }); */
        this.register.fullname=data.taxpayerInfo.lgnm;
        this.register.username=data.taxpayerInfo.tradeNam;
        this.register.houseNo=data.taxpayerInfo.pradr.addr.bnm;
        this.register.AreaColony=data.taxpayerInfo.pradr.addr.flno;
        this.register.City=data.taxpayerInfo.pradr.addr.dst;
        this.register.Landmark=data.taxpayerInfo.pradr.addr.st;
        this.register.Zipcode=data.taxpayerInfo.pradr.addr.pncd;
        this.register.State=data.taxpayerInfo.pradr.addr.stcd;
      }
    }, (err) => {
      this.auth.hideLoader();
      console.log("Error=>", err);
    });
  }
  goBack() {
    this.location.back();
  }
}

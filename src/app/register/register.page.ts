import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
//import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicForm: FormGroup;
  register = { fullname: "", username: "", email: "", phone: "", password: "", confirm_password: "" }
  requestObject: any;
  onlynumeric = /^-?(0|[1-9]\d*)?$/
  isSubmitted = false;
  public myToast: any;
  dataResponse: any;
  isKeyboardHide=true;
  emailFormat = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

  constructor(public navCtrl: NavController, private auth: AuthService,
    private keyboard: Keyboard,
     public formbulider: FormBuilder,
      public toast: ToastController
  
    ) 
    {
      window.addEventListener('keyboardDidShow', () => {
        console.log("Keyboard is Shown");
        this.isKeyboardHide=false;
        // document.body.classList.add('hide-on-keyboard-open');
        this.keyboard.onKeyboardShow().subscribe( (value)=>{
          document.body.classList.add('hide-on-keyboard-open');
          })
      });
      window.addEventListener('keyboardDidHide', () => {
        // document.body.classList.remove('hide-on-keyboard-open');
        this.isKeyboardHide=true;
        this.keyboard.onKeyboardHide().subscribe( (value)=>{
          document.body.classList.remove('hide-on-keyboard-open');
          } )
      
      });
  
    
    
    this.ionicForm = this.formbulider.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });

  }

  ngOnInit() {

  }

  fnLogin() {
    if (
      this.register.fullname != '' && 
      this.register.username != '' && 
      this.register.email != '' &&
       this.register.password != '' && 
       this.register.confirm_password !== '') {
      if (this.register.username.length >= 3) {
        if (this.register.password === this.register.confirm_password) {
          if (this.register.password.length >= 6) {
            if (this.register.phone.length == 10) {
              if (this.ionicForm.invalid) {
                console.log('invalid');
                this.ionicForm.get('fullname').markAllAsTouched();
                this.ionicForm.get('email').markAsTouched();
                this.ionicForm.get('phone').markAsTouched();
                this.ionicForm.get('username').markAsTouched();
                this.ionicForm.get('password').markAsTouched();
                this.ionicForm.get('confirm_password').markAsTouched();
                return false;
              }
              console.log('ok');
              this.requestObject = {
                "fullname": this.register.fullname,
                "username": this.register.username,
                "email": this.register.email,
                "phone": this.register.phone,
                "password": this.register.password
              }
              this.auth.showLoader();
              this.auth.signup(this.requestObject).subscribe((data: any) => {
                this.auth.hideLoader();
                console.log(data);
                this.dataResponse = data;
                if (this.dataResponse.status == true) {
                  this.auth.showToast('Signup Successfulluy');
                  this.navCtrl.navigateForward('/home');
                } else {
              this.auth.showToast('Username and Email must be uniq');
                }
              }, (err) => {
                this.auth.hideLoader();
                console.log("Error=>", err);
              });
            } else {
              this.auth.showToast('Mobile No should be 10 digits!');
            }
          } else {
            this.auth.showToast('Password should be minimum 6 digits!');
          }

        } else {
          this.auth.showToast('Enter confirm password same as password!');
        }
      } else {
        this.auth.showToast('Name should be minimum 3 digits!');
      }
    } else {
      this.showToast();
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
    this.navCtrl.navigateForward('home');
  }

}

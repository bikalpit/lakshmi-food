import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
//import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicForm: FormGroup;
  register = { username: "", email: "", password: "", confirm_password: "" }
  requestObject: any;
  onlynumeric = /^-?(0|[1-9]\d*)?$/
  isSubmitted = false;
  public myToast: any;

  constructor(public navCtrl: NavController, private auth: AuthService, public formbulider: FormBuilder, public toast: ToastController) { 
    this.ionicForm = this.formbulider.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit() {
   
  }

  fnLogin() {
    if (this.register.username != '' && this.register.email != '' && this.register.password) {
      this.requestObject = {
        "username": this.register.username,
        "email": this.register.email,
        "password": this.register.password
      }

      this.auth.signup(this.requestObject).subscribe((data: any) => {
        console.log(data);

        this.navCtrl.navigateForward('/home');

      }, (err) => {
        console.log("Error=>", err);
        //this.auth.showError(err.error.message);
      });
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

  fnSignIn(){
    this.navCtrl.navigateForward('home');
  }

}

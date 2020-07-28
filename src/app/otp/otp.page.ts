import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
email:any;
requestObject:any;
public verifyOtp: string;

  constructor(public navCtrl: NavController,private auth: AuthService) { }

  ngOnInit() {
    // this.email = localStorage.getItem("email");
    
    this.verifyOtp = ""; this.email = localStorage.getItem('email');
    console.log(this.email);
  }
  verificationOtp(){
    this.requestObject = { 
      "email":this.email,
      "otp": this.verifyOtp,
    };
    console.log( this.requestObject);
    this.auth.forgotPassword(this.requestObject).subscribe((data: any) => {
      console.log(data);
      this.navCtrl.navigateForward('/home');

    }, (err) => {
      console.log("Error=>",err);
      //this.auth.showError(err.error.message);
    });
    
  }
}

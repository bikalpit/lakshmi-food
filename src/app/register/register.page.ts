import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // confirm_password:any;
  // register = { username: "", email: "", password: "" ,confirm_password:""}
  // requestObject: any;
  // user_info: any;
  // dataResponse: any;

  constructor(public navCtrl: NavController,
    //public apiService: ApiService
    ) { }

  ngOnInit() {
  }
 
}

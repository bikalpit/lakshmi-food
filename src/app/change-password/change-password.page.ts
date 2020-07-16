import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(public navCtrl: NavController,public menu: MenuController) {
    this.menu.enable(true);

   }

  ngOnInit() {
  }
  fnChangePassword(){
    this.navCtrl.navigateForward('home');

  }
}

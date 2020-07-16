import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(public navCtrl: NavController,public menu: MenuController) {
    this.menu.enable(true);

   }

  ngOnInit() {
  }
  fnCancelOrder(){
    this.navCtrl.navigateForward('my-account');

  }
}

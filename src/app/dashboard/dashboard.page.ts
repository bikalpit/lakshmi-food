import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  name:any;

  constructor(public changeDetectorRef:ChangeDetectorRef,public menu: MenuController, public navCtrl: NavController,) {
    this.menu.enable(true);
    localStorage.setItem("cartData", '');
    this.name = localStorage.getItem('name');

    if(localStorage.getItem('id')==null){
      this.navCtrl.navigateForward('home');
      return;
    }

  }
 
  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }
  fnViewProducts() {
    this.navCtrl.navigateForward('product-list');
  }
  fnProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }
  myOrder() {
    this.navCtrl.navigateForward('customer-orders');
  }
}

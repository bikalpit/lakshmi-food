import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonSlides, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
})
export class ModalPopupPage implements OnInit {
  @Input() name: string;
  /*  slideOpts = {
     initialSlide: 1,
     speed: 400
   }; */
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  name1: any;
  weight: any;
  price: any;
  qty: any;
  url: any;
  cartData = [];
  subTotal: any;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
  item_qty = 0;
  baseIncrement = 0;

  slideOpts = {
    initialSlide: 1,
    loop: true,
    centeredSlides: true,
  };

  constructor(private commonService: CommonService, public navParams: NavParams, public modalCtrl: ModalController, public navCtrl: NavController) {
    this.item_qty = this.navParams.data.name.product_minimum_qty;
    this.baseIncrement = parseInt(this.navParams.data.name.product_minimum_qty);
  }

  ngOnInit() {
    this.url = this.commonService.url();
  }


  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  fnAddToCart(id, name, weight, price, qty, images) {

    this.cartData = [];

    if (localStorage.getItem("cartData")) {

      this.cartData = JSON.parse(localStorage.getItem("cartData"));
      var product_exits = false;

      this.cartData.forEach(element => {
        if (element.id == id) {
          element.qty = parseInt(element.qty) + parseInt(qty);
          product_exits = true;
        }
      });

      if (product_exits == false) {
        this.cartData.push({
          id: id,
          name: name,
          weight: weight,
          price: price,
          qty: qty,
          images: images
        });
      }

      localStorage.setItem("cartData", JSON.stringify(this.cartData));

    } else {

      this.cartData.push({
        id: id,
        name: name,
        weight: weight,
        price: price,
        qty: qty,
        images: images
      });

      localStorage.setItem("cartData", JSON.stringify(this.cartData));
    }

    console.log(this.cartData);
    this.navCtrl.navigateForward('your-cart');

  }

  fnremove() {
    if (this.item_qty - this.baseIncrement < this.baseIncrement) {
      this.item_qty = this.baseIncrement;
    }else {
      this.item_qty -= this.baseIncrement;
    }
  }

  fnadd() {
    let a=parseInt(this.item_qty.toString());
    this.item_qty=a += this.baseIncrement;
  }

}

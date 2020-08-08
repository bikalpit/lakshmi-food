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
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  name1: any;
  weight: any;
  price: any;
  qty: any;
  url:any;
  cartData = [];
  subTotal: any;


  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
  public item_qty = 0;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };

  constructor(private commonService: CommonService,public navParams: NavParams, public modalCtrl: ModalController, public navCtrl: NavController) {
    //console.log("data-->", navParams.get('name'));
    this.item_qty = 1;
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        }
      ]
    };
    //Item object for Food
    this.sliderTwo =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 324
        },
        {
          id: 321
        },
        {
          id: 435
        }
      ]
    };
    //Item object for Fashion
    this.sliderThree =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 643
        },
        {
          id: 532
        },
        {
          id: 232
        }
      ]
    };
  }

  ngOnInit() {
    this.url = this.commonService.url();
  }
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  fnAddToCart(id, name, weight, price, qty) {

    this.cartData = [];

    if (localStorage.getItem("cartData")) {

      this.cartData = JSON.parse(localStorage.getItem("cartData"));
      var product_exits = false;

      this.cartData.forEach(element => {
        if (element.id == id) {
          element.qty = element.qty + qty;
          product_exits = true;
        }
      });

      if (product_exits == false) {
        this.cartData.push({
          id: id,
          name: name,
          weight: weight,
          price: price,
          qty: qty
        });

      }
      localStorage.setItem("cartData", JSON.stringify(this.cartData));

    } else {

      this.cartData.push({
        id: id,
        name: name,
        weight: weight,
        price: price,
        qty: qty
      });

      localStorage.setItem("cartData", JSON.stringify(this.cartData));
    }

    console.log(this.cartData);
    this.navCtrl.navigateForward('your-cart');

  }

  fnremove() {
    if (this.item_qty - 1 < 1) {
      this.item_qty = 1;
      console.log('item_1->' + this.item_qty)
    }
    else {
      this.item_qty -= 1;
      console.log('item_2->' + this.item_qty);
    }
    console.log("hello");
  }

  fnadd() {
    this.item_qty += 1;
    console.log(this.item_qty + 1);
    console.log("hello add function");
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { constants } from 'buffer';
import { DatePipe } from '@angular/common';
import { Downloader } from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  providers: [DatePipe]

})
export class OrderSummaryPage implements OnInit {

  requestObject: any;
  ordersDetails = [];
  orderItem = [];
  dataResponse: any;
  //id: any;
  orderDate: any;
  date: any;
  cartData: any;
  mainSubTotal: any;
  DownloadRequest: any;

  constructor(private downloader: Downloader, 
    private datePipe: DatePipe, 
    private location: Location, 
    private router: Router, 
    private route: ActivatedRoute, 
    public navCtrl: NavController, 
    private auth: AuthService) {

    const state = this.router.getCurrentNavigation().extras.state
    // if (state) {
    //   this.id = state;
    //   console.log("order id-->", this.id);
    // }
    // if(JSON.parse(localStorage.getItem("cartData")).length!=0){
    //   this.cartData = JSON.parse(localStorage.getItem("cartData"));  
    // }

    // this.cartData = JSON.parse(localStorage.getItem("cartData"));
    // this.mainSubTotal = localStorage.getItem("mainsubtotal");

  }

  ngOnInit() {
    this.getOrderDetails();
    //this.down_load();
  }

  goBack() {
    this.location.back();

  }

  // fnCancelOrder(id) {

  //   this.navCtrl.navigateForward('cancel-order', { state: id });

  // }

  getOrderDetails() {

    // this.requestObject = {
    //   "order_id": "41"
    // }
    // console.log(this.requestObject);

    // this.auth.getOrderDetails(this.requestObject).subscribe((data: any) => {
    //   console.log(data);

    //   this.dataResponse = data.data;
    //   this.ordersDetails = this.dataResponse;
    //   this.date = this.dataResponse.create_at;


    //   this.orderDate = this.datePipe.transform(new Date(this.date), "dd-MM-yyyy");

    //   console.log("order data-->", this.ordersDetails);

    //   this.orderItem = this.dataResponse.order_item;
    //   console.log("order list data-->", this.orderDate);

    // }, (err) => {
    //   console.log("Error=>", err);
    //   //this.auth.showError(err.error.message);
    // });
  }

  // fnDownload() {
  //   var request = {
  //     uri: "http:\/\/laxmifoods.bi-team.in\/assets\/uploads\/orders\/5F2B9EB43B1C7.pdf",
  //     title: 'MyDownload',
  //     description: '',
  //     mimeType: '',
  //     visibleInDownloadsUi: true,
  //     destinationInExternalFilesDir: {
  //       dirType: 'Downloads',
  //       subPath: 'MyFile.apk'
  //     }
  //   };

  //   this.downloader.download(request)
  //     .then((location: string) => console.log('File downloaded at:' + location))
  //     .catch((error: any) => console.error(error));



  // }
  // down_load() {
  //   this.auth.DownloadPDF(this.requestObject).subscribe((data: any) => {
  //     console.log(data);


  //   }, (err) => {
  //     console.log("Error=>", err);
  //     //this.auth.showError(err.error.message);
  //   });

  // }

}

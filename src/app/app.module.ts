import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ModalPopupPage} from './modal-popup/modal-popup.page'
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@NgModule({
  declarations: [AppComponent, ModalPopupPage],
  entryComponents: [ModalPopupPage],
  imports: [BrowserModule, FormsModule,
    ReactiveFormsModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule, 
 
  ],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    CommonService,
    AuthService,
    DocumentViewer,
    File,
    FileOpener,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

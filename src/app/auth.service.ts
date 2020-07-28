import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';
import { ToastController } from '@ionic/angular';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, public toastCtrl : ToastController,public commonService: CommonService) { }

  login(data): Observable<any> {
    return this.commonService.postWithoutToken('users/login', data);
  }


}

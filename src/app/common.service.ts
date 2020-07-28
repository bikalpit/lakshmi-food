import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';


const API_URL = 'http://laxmifoods.bi-team.in/api/';



@Injectable()
export class CommonService {


    file_url = 'http://laxmifoods.bi-team.in/api/';

    constructor(private http: HttpClient,) {}

    postWithoutToken(url,data): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<any>(API_URL+url,data,{ headers: httpHeaders });
    }

    get(url): Observable<any> {
        const header = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem('token')
            }
        );
        return this.http.get(API_URL+url, { headers: header });
    }

    getWithoutToken(url): Observable<any> {
        const header = new HttpHeaders(
            {
                "Content-Type": "application/json",
            }
        );
        return this.http.get(API_URL+url, { headers: header });
    }

    post(url,data): Observable<any> {
        const header = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem('token')
            }
        );
        return this.http.post(API_URL+url,data, { headers: header });
    }

    postwithFormData(url,data):Observable<any> {
        const header = new HttpHeaders(
            {
                "Authorization":localStorage.getItem('token')
            }
        );
        return this.http.post(API_URL+url,data, { headers: header });
    }

	put(url,data): Observable<any> {
        const header = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem('token')
            }
        );
		return this.http.put(API_URL+url,data, { headers: header });
    }

    delete(url): Observable<any> {
        const header = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem('token')
            }
        );
		return this.http.delete(API_URL+url, { headers: header });
	}
}

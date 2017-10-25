import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://bsbp.siliconriver.com.ng/api/v1/';
//let apiUrl = 'http://localhost:5000/api/v1/';


  @Injectable()
  export class AuthServiceProvider {

    data: any[];

    constructor(public http: Http) {}

    login(credentials) {
      return new Promise((resolve, reject) => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');

          this.http.post(apiUrl+'authenticate', credentials, {headers: headers})
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {
              reject(err);
            });
      });
    }

    register(data) {
      return new Promise((resolve, reject) => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');

          this.http.post(apiUrl+'register', data, {headers: headers})
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {
              reject(err);
            });
      });
    }

    logout(){
      return new Promise((resolve, reject) => {
          let headers = new Headers();
          headers.append('X-Auth-Token', localStorage.getItem('token'));

          this.http.post(apiUrl+'logout', {}, {headers: headers})
            .subscribe(res => {
              localStorage.clear();
            }, (err) => {
              reject(err);
            });
      });
    }

  }

import { Injectable } from '@angular/core';
import { Http,  Headers, Response } from '@angular/http';
import { UtilsProvider } from './../../providers/utils/utils';
import 'rxjs/add/operator/map';


let url = 'http://bsbp.siliconriver.com.ng/api/v1';
//let url = 'http://localhost:5000/api/v1';

@Injectable()
export class QuestServiceProvider {

  api_token : string;

  constructor(public http: Http, private utils: UtilsProvider) {
    this.api_token = this.utils.getItem();
    console.log("apiiiii "+this.api_token);
  }

  public loadQuests() {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.get(url+ "/quest/list",{headers:headers}).map(res => res.json());
  }

  public loadLeaderboard() {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.get(url+ "/quest/leaderboard",{headers:headers}).map(res => res.json());
  }

  public QuestSubmit(data){
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.post(url+ "/quest/submit", data,{headers:headers}).map(res => res.json());
  }

  public QuestCompleted() {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.get(url+ "/quest/my-quests",{headers:headers}).map(res => res.json());
  }

}

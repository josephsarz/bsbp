import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { UtilsProvider } from './../../providers/utils/utils';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


let url = 'http://bsbp.siliconriver.com.ng/api/v1';
//let url = 'http://localhost:5000/api/v1';

@Injectable()
export class SocialServiceProvider {
api_token : string;
  constructor(public http: Http, private utils: UtilsProvider, private transfer: FileTransfer) {
    this.api_token = this.utils.getItem();
    console.log("apiiiii "+this.api_token);
  }


  public getPostImage(imagepath){

    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.get(url+ "/file/post-image/"+imagepath,{headers:headers}).map(res => res.json());

  }

  public loadMyActivity() {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.post(url+ "/activity", null,{headers:headers}).map(res => res.json());
  }

  public loadWallPost() {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.post(url+ "/wall-posts", null,{headers:headers}).map(res => res.json());

  }

  public  likepost(data : any){

    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.post(url+ "/wall-posts/like", data,{headers:headers}).map(res => res.json());

  }

  public insertPost(formdata: any ) {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('POST', url + '/wall-posts/add', true );
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('Api-Token', this.api_token);
    xhr.send(formdata);
    this.utils.loading.present();

    xhr.onreadystatechange = function() {
      if (xhr.status == 200) {
          console.log('Success');
      }
      else console.log(xhr.responseText);
    }

    // let headers = new Headers();
    // headers.append('api-token', this.api_token);
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    // headers.append("Content-Type", 'false');
    //headers.append('data',form);

    // return new Promise((resolve, reject) => {
    //       this.http.post(url+"/wall-posts/add", formdata, {headers: headers})
    //       .subscribe(res => {
    //         resolve(res.json());
    //       }, (err) => {
    //         reject(err);
    //       });
    //     });
    }

  uploadPost(img, desc) {
var trustAllHosts = true;
  // Destination URL
  let furl = url + '/wall-posts/add';

  // File for Upload
  var targetPath = img;

  var options: FileUploadOptions = {
    fileKey: 'image[]',
    chunkedMode: false,
    httpMethod: 'post',
    // mimeType: 'multipart/form-data',
    params: { 'desc': desc, 'video': ""},
    headers: {
      'api-token': this.api_token,
      'Content-Type':'false'
      }
  };

  const fileTransfer: FileTransferObject = this.transfer.create();


    // Use the FileTransfer to upload the image
    this.utils.loading = this.utils.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.utils.loading.present();

    fileTransfer.onProgress((e)=>
  {
    let prg=(e.lengthComputable) ?  Math.round(e.loaded / e.total * 100) : -1;
    console.log("progress:"+prg);
  });

  // Use the FileTransfer to upload the image
  return fileTransfer.upload(targetPath, furl, options, trustAllHosts);
}

  public deletePost(data)
  {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.post(url+ "/wall-posts/delete", data,{headers:headers}).map(res => res.json());
  }

  public editPost(formdata: any)
  {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
    return this.http.post(url+ "/wall-posts/delete", formdata, {headers:headers}).map(res => res.json());
  }


  private _errorHandler(error: Response) {
       console.error('Error Occured: ' + error);
       return Observable.throw(error || 'Some Error on Server Occured');

   }

}

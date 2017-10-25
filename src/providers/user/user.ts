import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { UtilsProvider } from './../../providers/utils/utils';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

let url = 'http://bsbp.siliconriver.com.ng/api/v1';
//let url = 'http://localhost:5000/api/v1';

@Injectable()
export class UserProvider {


  api_token : string;
    constructor(public http: Http, private utils: UtilsProvider) {
      this.api_token = this.utils.getItem();
    }

  public getUserData()
  {
    let headers = new Headers();
    headers.append('api-token', this.api_token);
    var response = this.http.get(url+"/profile", {headers:headers}).map(res => res.json());
    return response
    .catch(this._errorHandler) ;
  }
  private _errorHandler(error: Response) {
       console.error('Error Occured: ' + error);
       return Observable.throw(error || 'Some Error on Server Occured');

   }

//   isUsernameFree(username) {
//     let promise = new Promise((res, rej) => {
//       this.searchUser(username)
//       .subscribe(value => {
//         if(value.length === 0) {
//           res(true)
//         } else {
//           res(false);
//         }
//       });
//     });
//     return promise;
//   }
//
//   // Save logged in user info in LocalStorage at userInfo key
//   saveUser(userData) {
//     this.storage.setJson("userInfo",userData);
//   }
//
//   // Get Current User's UID
//   getUid() {
//     let promise = new Promise((res, rej) => {
//       this.storage.get('userInfo')
//       .then(value => {
//         let uid = JSON.parse(value).auth.uid;
//         res(uid);
//       });
//     })
//
//     return promise;
//   }
//
//   // Create User in Firebase
//   createUser(userData) {
//     return this.getUid()
//     .then(uid => {
//       let url = `/users/${uid}`;
//   //    let user = this.af.database.object(url);
//     //  return user.set(userData);
//     });
//   }
//
//   updateProfile(obj) {
//    return this.getUid()
//     .then(uid => {
// //      return this.af.database.object(`/users/${uid}/`).update(obj);
//     });
//   }

  // // upload profile picture
  // uploadPicture(file) {
  //   return this.getUid()
  //   .then(uid => {
  //       let promise = new Promise((res,rej) => {
  //       let fileName = uid + '.jpg';
  //     let pictureRef = firebase.storage().ref(`/profile/${fileName}`);
  //       let uploadTask = pictureRef.put(file);
  //
  //       uploadTask.on('state_changed', function(snapshot) {
  //       }, function(error) {
  //         rej(error);
  //       }, function() {
  //         var downloadURL = uploadTask.snapshot.downloadURL;
  //         res(downloadURL);
  //       });
  //     });
  //
  //     return promise;
  //   });
  // }
  //
  // // Search User with given username
  // searchUser(username) {
  //   let query = {
  //     orderByChild: 'username'
  //   };
  //   // username is given
  //   if(username) {
  //     query['equalTo'] = username;
  //   }
  //   let users = this.af.database.list('/users', {
  //     query: query
  //   });
  //   return users;
  // }
  //
  // // Get All Followers of a Logged In
  // getFollowers() {
  //   return this.getUid()
  //   .then(uid => {
  //     return this.af.database.list(`/users/${uid}/followers`);
  //   });
  // }

}

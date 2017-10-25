import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialServiceProvider } from './../../providers/social-service/social-service';
import { UtilsProvider } from './../../providers/utils/utils';


@IonicPage()
@Component({
  selector: 'page-my-activity',
  templateUrl: 'my-activity.html',
})
export class MyActivityPage {

  posts: any;
  isFavorite = false;

  constructor(private utils:UtilsProvider, private socialService: SocialServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.utils.showLoader("fetching data");
     this.getMyPosts();
    this.utils.loading.dismiss();

  }

  getMyPosts(){
    return this.socialService.loadMyActivity().subscribe(result => {
      console.log(result.data);
      this.posts = result.data;
    });
  }

  doRefresh(refresher) {
    this.getMyPosts();  // calls the getPost method
    setTimeout(() => {
      refresher.complete(); // stops the refresher 2 seconds after retreiving the Data
    }, 2000);
}


}

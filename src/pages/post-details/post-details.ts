import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialServiceProvider } from './../../providers/social-service/social-service';
import { UtilsProvider } from './../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-post-details',
  templateUrl: 'post-details.html',
})
export class PostDetailsPage {

  item: any;

   constructor(public utils: UtilsProvider, private socialService: SocialServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
     this.item = this.navParams.get('post');
   }

   deletePost(id){
     var  data = "post_id="+id;

     this.socialService.deletePost(data).subscribe(
        suc => {
          this.utils.loading.dismiss();
          this.utils.presentToast("Post Deleted");
          this.navCtrl.push('SocialWallPage');
          console.log(suc);
        },
        err => {
          this.utils.loading.dismiss();
          this.utils.presentToast(err);
            console.log(err );
        }
      );
   }

}

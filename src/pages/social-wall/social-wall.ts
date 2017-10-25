import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialServiceProvider } from './../../providers/social-service/social-service';
import { UtilsProvider } from './../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-social-wall',
  templateUrl: 'social-wall.html',
})
export class SocialWallPage {
  posts: any;
  isFavorite: boolean;

  constructor(public utils: UtilsProvider, private socialService: SocialServiceProvider ,public navCtrl: NavController, public navParams: NavParams) {
      this.utils.showLoader("fetching data");
       this.getPosts();
       this.utils.loading.dismiss();

  }

  async getPosts(){
    return await this.socialService.loadWallPost().subscribe(result => {
      this.posts = result.data;
      //console.log(JSON.stringify(this.posts.meta));
    });
  }

  public favoritePost(id){

    var data = "&post_id="+id;

    return this.socialService.likepost(data).subscribe(result =>{
        console.log(result);
        if(result.post_id != null){
          this.isFavorite = true;
        }else{
          this.isFavorite = false;
        }
    });

  }


  public getPostImage(image){
    return this.socialService.getPostImage(image).subscribe(result => {
      //console.log(result);
    });
  }

  doRefresh(refresher) {
    this.getPosts();  // calls the getPost method
    setTimeout(() => {
      refresher.complete(); // stops the refresher 2 seconds after retreiving the Data
    }, 4000);
}

addNewPost(){
  this.navCtrl.push('AddPostPage');
}

  openDetails(post) {
    this.navCtrl.push('PostDetailsPage', { post: post});
  }

}

import { Component } from '@angular/core';
import { IonicPage, ActionSheetController, NavController } from 'ionic-angular';
import { UtilsProvider } from './../../providers/utils/utils';
import { SocialServiceProvider } from './../../providers/social-service/social-service';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  lastImage = null;
  desc:string;
  Error: string;
  Errors: string;

  constructor(public utils: UtilsProvider , public socialService: SocialServiceProvider, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
  }

  addNewPost(): void{
    this.navCtrl.push('AddPostPage');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.utils.takePicture(this.utils.camera.PictureSourceType.PHOTOLIBRARY);
            this.lastImage = this.utils.lastImage;
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.utils.takePicture(this.utils.camera.PictureSourceType.CAMERA);
            this.lastImage = this.utils.lastImage;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  uploadPost() {
    var targetPath = this.utils.pathForImage(this.utils.lastImage);
    this.socialService.uploadPost(targetPath, this.desc).then(res => {
      this.utils.loading.dismissAll()
      this.utils.presentToast('succesful uploaded.');
    }, err => {
      this.utils.loading.dismissAll()
      this.utils.presentToast('Error '+ JSON.stringify(err));
      this.Error =  JSON.stringify(err);
    });
  }

 insertPost(){
   console.log("description: "+this.desc);
   var targetPath = this.utils.pathForImage(this.utils.lastImage);
   let formData = new FormData();
    formData.append("post", this.desc);
    formData.append("images[]", targetPath);
    console.log(formData);

    this.socialService.insertPost(formData);
    

      // this.utils.loading.dismissAll()
      // this.utils.presentToast('succesful uploaded.');

    }
}

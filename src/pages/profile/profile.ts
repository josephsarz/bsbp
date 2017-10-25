import { Component } from '@angular/core';
import { IonicPage, ActionSheetController,  NavController, NavParams } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { UtilsProvider } from './../../providers/utils/utils';
import { QuestServiceProvider } from './../../providers/quest-service/quest-service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = {};
  Error : any;

  constructor(public questService: QuestServiceProvider , public actionSheetCtrl: ActionSheetController, public utils: UtilsProvider , private userService: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.submitQuest(1);
  }

  ionViewDidLoad() {
    this.getUserData();
  }
  getUserData(){
    return this.userService.getUserData().subscribe(user => {
      console.log(user),
      this.user = user;
    }, error =>{
       this.Error = JSON.stringify(error);
    });
  }

  submitQuest(id){
    
    var data = "quest_id="+id

    this.questService.QuestSubmit(data).subscribe(result =>{
      console.log(result);
      this.utils.presentToast("Congrats, You have completed this Quest");
    }, error =>{
       console.log(error);
    })

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.utils.takePicture(this.utils.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.utils.takePicture(this.utils.camera.PictureSourceType.CAMERA);
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



  public logOut(){
    this.navCtrl.push('LandingPage');
    this.utils.clearStorage();
  }

}

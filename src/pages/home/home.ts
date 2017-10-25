import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {ViewController, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from './../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  constructor(public utils: UtilsProvider, private viewCtrl:ViewController, public navCtrl: NavController, public storage: Storage) {
      this.getKey();
  }

  getKey(){
     this.utils.getItem();
  }



    openProfile(): void{
      this.navCtrl.push('ProfilePage')
    }

  openSchedule() {
    this.navCtrl.push('SchedulePage');
  }
  openSocialWall() {
    this.navCtrl.push('SocialWallPage');
  }
  openEventFeed() {
    this.navCtrl.push('EventFeedPage');
  }
  openMyActivity() {
    this.navCtrl.push('MyActivityPage')
  }
  openNotification() {
    this.navCtrl.push('NotificationPage');
  }
  openLineUp() {
    this.navCtrl.push('LineUpPage');
  }
  openQuest() {
    this.navCtrl.push('QuestPage');
  }
  openLeaderboard() {
    this.navCtrl.push('LeaderboardPage');
  }
  openSponsors() {
    this.navCtrl.push('SponsorsPage');
  }

}

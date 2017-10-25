import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestServiceProvider } from './../../providers/quest-service/quest-service';
import { UtilsProvider } from './../../providers/utils/utils';


@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  leads: any;

  constructor(public utils: UtilsProvider, private questService: QuestServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.utils.showLoader("fetching data");
     this.getLeaderboard();
     this.utils.loading.dismiss();
  }

  getLeaderboard(){
    return this.questService.loadLeaderboard().subscribe(result => {
      this.leads = result;
      console.log(this.leads);
  });
}
}

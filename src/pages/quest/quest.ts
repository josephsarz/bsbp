import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestServiceProvider } from './../../providers/quest-service/quest-service';
import { UtilsProvider } from './../../providers/utils/utils';



@IonicPage()
@Component({
  selector: 'page-quest',
  templateUrl: 'quest.html',
})
export class QuestPage {
  isCompleted = false;
  quests: any

  constructor(public utils: UtilsProvider, private questService: QuestServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.utils.showLoader("fetching data");
     this.getQuestsList();
     this.utils.loading.dismiss();
  }

  getQuestsList(){
    return this.questService.loadQuests().subscribe(result => {

      this.quests = result;
      console.log(this.quests);
    });
  }

  getDetails(id){
    console.log(id);
    return id;
  }

}

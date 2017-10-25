import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})


export class SchedulePage {


  sessions: any;

  constructor(
    public navCtrl: NavController) {
      this.sessions = new Array(10);
  }
  
}

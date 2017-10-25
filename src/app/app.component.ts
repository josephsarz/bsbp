import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UtilsProvider } from './../providers/utils/utils';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'LandingPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, utils:UtilsProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let key = utils.getItem();
            if(key == null) {
            	this.rootPage = "LandingPage";
            } else {
            	this.rootPage = "HomePage";
            }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = { email:"", password:"" };
  data: any;
  urlEncodedata: string;

  constructor(public utils: UtilsProvider, public navCtrl: NavController, public authService: AuthServiceProvider, public storage: Storage) {

  }


  doLogin() {
    //Url Encode the userdatails
        this.urlEncodedata =
        "&email=" + encodeURIComponent(this.loginData.email) +
        "&password=" + encodeURIComponent(this.loginData.password);

    this.utils.showLoader("Authenticating");

    this.authService.login(this.urlEncodedata).then((result) => {
      this.data = result;

    //  this.utils.clearStorage();

      this.utils.setItem(this.data);


      this.utils.loading.dismiss();
      this.navCtrl.setRoot('HomePage');
    }, (err) => {
      this.utils.loading.dismiss();
      this.utils.presentToast(err);
    });
  }

  register() {
    this.navCtrl.push('SignupPage');
  }

}

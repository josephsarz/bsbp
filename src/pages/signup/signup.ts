import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UtilsProvider } from './../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  loading: any;
  regData = { firstname: "", lastname: "", username: "", email: "", password: "", retypedpassword: ""};

  urlEncodedata: string;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public utils: UtilsProvider) {

  }



  doSignup() {

//Url Encode the userdatails
    this.urlEncodedata = "firstname=" + encodeURIComponent(this.regData.firstname) +
    "&lastname=" + encodeURIComponent(this.regData.lastname) +
    "&username=" + encodeURIComponent(this.regData.username) +
    "&email=" + encodeURIComponent(this.regData.email) +
    "&password=" + encodeURIComponent(this.regData.password) +
    "&retyped_password=" + encodeURIComponent(this.regData.retypedpassword);

//show loader
    this.utils.showLoader("registering...");

//connect to the provider and get response
    this.authService.register(this.urlEncodedata).then((result) => {
      this.utils.loading.dismiss();
      this.navCtrl.push('LoginPage');
      this.utils.presentToast("Succesfully Created user")
    }, (err) => {
      this.utils.loading.dismiss();
      this.utils.presentToast(err);
    });

  }

  public login(){
    this.navCtrl.push('LoginPage');
  }

}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Auth } from '../providers/auth';

import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  loader: any;

  constructor(public auth: Auth, public loadingCtrl: LoadingController) {

    this.presentLoading();

    this.auth.login().then((isLoggedIn)=> {
      if(isLoggedIn){
        this.rootPage = HomePage
        console.log('Is logged in!');
      } else {
        this.rootPage = LoginPage;
        console.log('Is NOT logged in!');
      }

      this.loader.dismiss();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }
}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBobA5wDxEDgXZrCXJ7_8ER9aaP1YMAZz4",
    authDomain: "adote-um-pet-projeto-faculdade.firebaseapp.com",
    databaseURL: "https://adote-um-pet-projeto-faculdade.firebaseio.com",
    projectId: "adote-um-pet-projeto-faculdade",
    storageBucket: "adote-um-pet-projeto-faculdade.appspot.com",
    messagingSenderId: "207215009124"
  };

  firebase.initializeApp(config);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

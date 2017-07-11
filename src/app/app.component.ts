import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RoomStatusPage } from '../pages/room-status/room-status';
import { Insomnia } from '@ionic-native/insomnia';
import * as Moment from "moment";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RoomStatusPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, insomnia: Insomnia) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova')) {
       insomnia.keepAwake()
        .then(
          () => console.log('success insomnia'),
          () => console.log('error insomnia')
        );
      }

      setInterval(() => {
            const hour =  Moment().hour();
            if(hour>=8 && hour<=18) {
                //awake
                insomnia.keepAwake()
                .then(
                  () => console.log('success insomnia'),
                  () => console.log('error  insomnia')
                );
            } else {
                insomnia.allowSleepAgain()
                .then(
                  () => console.log('success insomnia'),
                  () => console.log('error insomnia')
                );
            }
      }, 60000*30);

      // this.createTable();
    });
  }
}

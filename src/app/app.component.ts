import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { RoomStatusPage } from '../pages/room-status/room-status';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RoomStatusPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.createTable();
    });
  }

  // createTable() {
  //   this.sqlite.create({
  //     name: 'booking.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {

  //       db.executeSql('create table book(name VARCHAR(32))', {})
  //         .then(() => console.log('Executed SQL'))
  //         .catch(e => console.log(e));

  //     })
  //     .catch(e => console.log(e));
  // }
}

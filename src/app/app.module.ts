import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HelpPage } from '../pages/help/help';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule  } from 'ionic2-calendar';
import { RoomBookingPageModule  } from '../pages/room-booking/room-booking.module';
import { RoomStatusPageModule  } from '../pages/room-status/room-status.module';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { HttpModule }    from '@angular/http';
import { BookingDataProvider } from '../providers/booking-data/booking-data';
import { Insomnia } from '@ionic-native/insomnia';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    RoomBookingPageModule,
    RoomStatusPageModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Insomnia,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

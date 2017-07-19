import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoomBookingPage } from '../room-booking/room-booking';
import { RoomStatusPage } from '../room-status/room-status';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  constructor(public navCtrl: NavController, public storage:Storage) {

  }

   ionViewDidLoad() {

   }


}

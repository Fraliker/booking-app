import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Todo } from './todo';
import { RoomBookingPage } from '../room-booking/room-booking';
import { RoomStatusPage } from '../room-status/room-status';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todo: Todo = { 
    title:'a',
    description:'x'
  };

  @ViewChild('barCanvas') barCanvas;
 
   barChart: any;
 

  constructor(public navCtrl: NavController) {
    
  }

   ionViewDidLoad() {
 
   }

   goToRoomBooking() {
     
     this.navCtrl.push(RoomBookingPage);
   }
   goToRoomStatus() {
     
     this.navCtrl.push(RoomStatusPage);
   }

}

import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoomBookingPage } from '../room-booking/room-booking';
import { RoomStatusPage } from '../room-status/room-status';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage:Storage) {
    
  }

   ionViewDidLoad() {

    this.storage.ready().then(() => {
      this.storage.get("booking").then((val) => {
        
        val.forEach(element => {
          console.log("val "+JSON.stringify(element));  
        });
       });
    });
     
      
   }

   goToRoomBooking() {
     
     this.navCtrl.push(RoomBookingPage);
   }
   goToRoomStatus() {
     
     this.navCtrl.push(RoomStatusPage);
   }

}

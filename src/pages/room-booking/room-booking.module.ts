import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomBookingPage } from './room-booking';
import { BookingDataProvider } from '../../providers/booking-data/booking-data';

@NgModule({
  declarations: [
    RoomBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomBookingPage),
  ],
  exports: [
    RoomBookingPage
  ],
  providers: [BookingDataProvider]
})
export class RoomBookingPageModule {}

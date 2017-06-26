import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomStatusPage } from './room-status';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    RoomStatusPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(RoomStatusPage),
  ],
  exports: [
    RoomStatusPage
  ]
})
export class RoomStatusPageModule {}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BookingDataProvider, Booking } from '../../providers/booking-data/booking-data';
import { RoomBookingPage } from '../room-booking/room-booking';
import { Subscription } from 'rxjs/Subscription';
import { CalendarComponent } from "ionic2-calendar/calendar";
import * as Moment from "moment";
/**
 * Generated class for the RoomStatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room-status',
  templateUrl: 'room-status.html',
})
export class RoomStatusPage {
    @ViewChild(CalendarComponent) myCalendar:CalendarComponent;

    subscription:Subscription;
    eventSource = [];
    viewTitle;
    selectedDate:Date;

    isToday:boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };


    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public bookingDataProvider: BookingDataProvider) {
        
        this.subscription = this.bookingDataProvider.getSubject().subscribe(message => { 
            if(message) {
                console.log('from observable ' + JSON.stringify(message));
                if(message.operation=='UPDATE') {  
                    this.eventSource = this.eventSource.map(value => {
                        if(value.id === message.id) {
                            return message;
                        } else {
                            return value;
                        }
                    });
                } else if(message.operation=='DELETE') {
                    this.eventSource = this.eventSource.filter(value => {
                        if(value.id === message.id) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                } else {
                    this.eventSource.push(message);
                }
                
                this.myCalendar.loadEvents();
            }
        });

    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title, +', '+ event.id);
        this.navCtrl.push(RoomBookingPage, event);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(9, 0, 0, 0);
        event.setHours(9, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        this.selectedDate = event;
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    }


  ionViewDidLoad() {
    this.bookingDataProvider.loadEvent();

    // setInterval(() => {
    //   this.eventSource.forEach(value => {
    //     let eventStartTime = Moment(value.startTime);
    //     let eventMaxStartTime = eventStartTime.clone().add(10,'minutes');
    //     let now = Moment();
    //     if(now.isSameOrAfter(eventMaxStartTime)) {
    //         console.log('EXPIRED' + eventStartTime.toString()+' '+eventMaxStartTime.toString());
    //         this.bookingDataProvider.getSubject().next({
    //             id: value.id,
    //             operation: 'DELETE'
    //         });
    //         this.presentToast(value);
    //     }
        
    //     //this.presentToast(null);
    //   });
    // }, 10000); 
  }

   presentToast(booking:Booking) {
    let toast = this.toastCtrl.create({
      message: `Booking ${booking.room} - ${booking.fullName} on ${booking.bookDate} - ${booking.bookStartTime} was deleted successfully`,
      showCloseButton: true
    });
    toast.present();
  }

  ionViewWillUnload() {
      this.subscription.unsubscribe();
  }

   goToRoomBooking() {
     this.navCtrl.push(RoomBookingPage, {
         bookDate: this.selectedDate.toISOString(),
         room: 'Room 7A',
         bookStartTime: '09:00',
         bookEndTime: '10:00'
     });
   }

   getStyle(booking:Booking) {
       let color;
       if(booking.room==='Room 7A') {
           color = '#3399EE';
       } else if(booking.room==='Room 7B') {
           color = '#ff66aa';
       } else if(booking.room==='Room 7C') {
           color = '#ee9900';
       } else {
           color = '#00eecc';
       }
       return color;
   }
}

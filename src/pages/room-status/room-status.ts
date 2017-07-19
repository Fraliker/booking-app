import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BookingDataProvider, Booking } from '../../providers/booking-data/booking-data';
import { RoomBookingPage } from '../room-booking/room-booking';
import { Subscription } from 'rxjs/Subscription';
import { CalendarComponent } from "ionic2-calendar/calendar";
import * as Moment from "moment";
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';

declare var mdDateTimePicker:any;
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
    startDate:Moment.Moment;

    isToday:boolean;
    elapsedCount:string = 'a few moments ago';
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


    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public bookingDataProvider: BookingDataProvider, public platform:Platform,public modalCtrl: ModalController) {

        this.subscription = this.bookingDataProvider.getSubject().subscribe(message => {
            if(message) {
                //console.log('from observable ' + JSON.stringify(message));
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
        this.startDate = Moment();
        // platform.ready().then(() => {
        //   if (this.platform.is('cordova')) {
        //     this.backgroundMode.on('enable').subscribe(()=>{
        //     });
        //   } else {
        //     // Cordova not accessible, add mock data if necessary
        //   }
        // });

    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        //console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title, +', '+ event.id);
        this.navCtrl.push(RoomBookingPage, event);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
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
    var that = this;

    setInterval(() => {
      this.elapsedCount = this.startDate.from(Moment());
    }, 60000);

    setInterval(() => {
      this.today();
    }, 60000*60*5);

    setInterval(() => {

      var p = Promise.resolve(1);

      this.eventSource.map(value => {
          return function() {
            let eventStartTime = Moment(value.startTime);
            let eventMaxStartTime = eventStartTime.clone().add(10,'minutes');
            let now = Moment();
            if(now.isSameOrAfter(eventMaxStartTime) && value.checkin!=true) {
                //console.log('EXPIRED' + eventStartTime.toString()+' '+eventMaxStartTime.toString());
                return that.bookingDataProvider.delete(value.id).then(value1 => {
                  that.presentToast(value1);
                  return Promise.resolve(1);
                });
            } else {
                return Promise.resolve(1);
            }
          }
      }).reduce((pacc,fn) => {
        return pacc = pacc.then(fn);
      }, p);

    },60000);

    // setInterval(() => {

    //     }

    //     //this.presentToast(null);
    //   });
    // }, 10000);
  }

   presentToast(booking:Booking) {
    let bookDate = Moment(booking.bookDate).format("DD MMMM YYYY");
    let toast = this.toastCtrl.create({
      message: `Booking ${booking.room} - ${booking.fullName} on ${bookDate} ${booking.bookStartTime} is deleted due to miss check-in`,
      showCloseButton: true
    });
    toast.present();
  }

  ionViewWillUnload() {
      this.subscription.unsubscribe();
  }

   goToRoomBooking() {
     let currentTime = Moment();
     let currentHour  = currentTime.hours();
     let currentMin  = currentTime.minutes();

     if(currentMin>30) {
       currentTime.set('hour',currentHour+1);
     } else {
       currentTime.set('hour',currentHour);
     }

     if(currentMin>=20 && currentMin<=30) {
        currentTime.set('minute',30);
     } else {
        currentTime.set('minute',0);
     }

     this.navCtrl.push(RoomBookingPage, {
         bookDate: this.selectedDate.toISOString(),
         room: 'Room 7B',
         bookStartTime: currentTime.format('HH:mm'),
         bookEndTime: currentTime.add(1,'hour').format('HH:mm')
     });
   }

   getStyle(booking:Booking) {
       let color;
       if(booking.room==='Room 7B') {
           color = '#3399EE';
       } else if(booking.room==='Room 7C') {
           color = '#ff66aa';
       } else if(booking.room==='Room 7D') {
           color = '#ee9900';
       } else if(booking.room==='Town Hall') {
           color = '#00eecc';
       }
       else {
           color = '#332266';
       }
       return color;
   }

   openHelp() {

    let profileModal = this.modalCtrl.create(HelpPage, { });
    profileModal.present();
   }
}

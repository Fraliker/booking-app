import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

    eventSource;
    viewTitle;

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


    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
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
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        var date = new Date();
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        var startTime = new Date(2017, 5 , 27, 2, 0);
        var endTime = new Date(2017, 5 , 27, 3, 0);
        events.push({
            title: 'Event - 123',
            startTime: startTime,
            endTime: endTime,
            allDay: false,
            roomNo: 'sadasd'
        });
        events.push({
            title: 'Event - 1234',
            startTime: new Date(2017, 5 , 27, 2, 30),
            endTime: endTime,
            allDay: false
        });

        // for (var i = 0; i < 50; i += 1) {
        //     var date = new Date();
        //     var eventType = Math.floor(Math.random() * 2);
        //     var startDay = Math.floor(Math.random() * 90) - 45;
        //     var endDay = Math.floor(Math.random() * 2) + startDay;
        //     var startTime;
        //     var endTime;
        //     if (eventType === 0) {
        //         startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        //         if (endDay === startDay) {
        //             endDay += 1;
        //         }
        //         endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        //         events.push({
        //             title: 'All Day - ' + i,
        //             startTime: startTime,
        //             endTime: endTime,
        //             allDay: true
        //         });
        //     } else {
        //         var startMinute = Math.floor(Math.random() * 24 * 60);
        //         var endMinute = Math.floor(Math.random() * 180) + startMinute;
        //         startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        //         endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        //         events.push({
        //             title: 'Event - ' + i,
        //             startTime: startTime,
        //             endTime: endTime,
        //             allDay: false
        //         });
        //     }
        // }
        return events;
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
    console.log('ionViewDidLoad RoomStatusPage');
  }

}

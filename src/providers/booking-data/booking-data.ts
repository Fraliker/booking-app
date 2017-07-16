import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import * as Moment from "moment";
/*
  Generated class for the BookingDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BookingDataProvider {

  private subject = new Subject<any>();
  private deletedSubject = new Subject<any>();

  constructor(public http: Http, public storage: Storage) {
  }

  getSubject() {
    return this.subject;
  }
  get() {
    return this.storage.get('bookings');
  }

  convertBookToEvent(data: Booking) {
    let dataCalendar = {
      title: `${data.room} ${data.fullName}`,
      allDay: false,
      startTime : new Date(data.startTime),
      endTime : new Date(data.endTime),
    };
    return {  ...data, ...dataCalendar};
  }

  loadEvent() {
    this.get().then(data => {
      if (data) {
        data.forEach((e: Booking) => {
          this.subject.next(this.convertBookToEvent(e));
        });
      }
    });
  }


  delete(id): Promise<Booking> {
    let that = this;
    let deletedBooking;
    return this.storage.get('bookings').then((data: Booking[]) => {
      //console.log('start '+id);
      let bookingArray: Booking[] = [];

      let idField = { id };

      if (data != null) {
        bookingArray = data;
      }

      bookingArray = bookingArray.filter( value => {
        if(value.id === idField.id) {
            deletedBooking = value;
            return false;
        } else {
          return true;
        }
      });

      //console.log('delete '+JSON.stringify(bookingArray));
      let operationField = { operation : 'DELETE'};
      this.subject.next( { ...idField, ...operationField});

      return bookingArray;
    }).then( bookingArray => {
      return that.storage.set('bookings', bookingArray);
    }).then( () => {
      console.log('end');
      return deletedBooking;
    });

  }

  checkIn(id): Promise<Booking[]> {
    return this.storage.get('bookings').then((data: Booking[]) => {
      let bookingArray: Booking[] = [];

      let idField = { id: id };

      if (data != null) {
        bookingArray = data;
      }

      let signInField = {checkin:true};
      let booking;
      bookingArray = bookingArray.map( value => {
        if(value.id === idField.id) {
            booking = {...value,...signInField};
            return booking;
        } else {
          return value;
        }
      });

      this.storage.set('bookings', bookingArray);

      let operationField = { operation : 'UPDATE' };
      this.subject.next( { ...this.convertBookToEvent(booking), ...operationField});
      return Promise.resolve(bookingArray);
    });
  }

  save(newData): Promise<Booking[]> {

    let isUpdate = false;
    if(newData.id) {
      isUpdate = true;
    }
    let idField = { id: newData.id || new Date().getTime() };

    let now = Moment();
    let startTime = new Date(newData.bookDate);
    
    startTime.setHours(newData.bookStartTime.split(":")[0]);
    startTime.setMinutes(newData.bookStartTime.split(":")[1]);
    startTime.setMilliseconds(0);
    let startTimeField = { startTime };
    let endTime = new Date(newData.bookDate);
    endTime.setHours(newData.bookEndTime.split(":")[0]);
    endTime.setMinutes(newData.bookEndTime.split(":")[1]);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);
    let endTimeField = { endTime };

    let checkin = false;
    
    if(Moment(startTime).isBefore(now)) {
      checkin = true;
    }

    let checkinField = { checkin };

    let newDataWithId: Booking = { ...newData, ...idField, ...startTimeField, ...endTimeField, ...checkinField };

    return this.storage.get('bookings').then((data: Booking[]) => {
      let bookingArray: Booking[] = [];
      if (data != null) {
        bookingArray = data;
      }

      if(isUpdate) {

        const duplicateResult = bookingArray.filter(data => {
            return newDataWithId.id !== data.id && newDataWithId.room === data.room && ( 
              (Moment(newDataWithId.startTime).isSameOrAfter(Moment(data.startTime)) &&  Moment(newDataWithId.startTime).isBefore(Moment(data.endTime)))  ||
              (Moment(newDataWithId.endTime).isAfter(Moment(data.startTime)) &&  Moment(newDataWithId.endTime).isSameOrBefore(Moment(data.endTime)))  
            )
        });
        if(duplicateResult.length>0 ){
          throw 'Duplicate room booking detected'; 
        }

        bookingArray = bookingArray.map( value => {
          if(value.id === newDataWithId.id) {
              return newDataWithId;
          } else {
            return value;
          }
        });
      }
      else {

        const duplicateResult = bookingArray.filter(data => {
            return newDataWithId.room === data.room && ( 
              (Moment(newDataWithId.startTime).isSameOrAfter(Moment(data.startTime)) &&  Moment(newDataWithId.startTime).isBefore(Moment(data.endTime)))  ||
              (Moment(newDataWithId.endTime).isAfter(Moment(data.startTime)) &&  Moment(newDataWithId.endTime).isSameOrBefore(Moment(data.endTime)))  
            )
        });

        if(duplicateResult.length>0 ){
          throw 'Duplicate room booking detected'; 
        }
        
        bookingArray.push(newDataWithId);
      }

      this.storage.set('bookings', bookingArray);

      let operationField = { operation : isUpdate?'UPDATE':'NEW'};
      this.subject.next( { ...this.convertBookToEvent(newDataWithId), ...operationField});
      return Promise.resolve(bookingArray);
    });
  }

}

export class Booking {
  id: number;
  fullName: string;
  bookDate: Date;
  room: string;
  startTime: Date;
  endTime: Date;
  bookStartTime: string;
  bookEndTime: string;
  checkin: boolean;
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Booking }  from '../../app/model/booking';
/**
 * Generated class for the RoomBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room-booking',
  templateUrl: 'room-booking.html',
})
export class RoomBookingPage {

    eventSource;
    viewTitle;
    booking:Booking;

    bookingForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage, private formBuilder: FormBuilder) {
        this.bookingForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            room: ['rm1', Validators.required],
            bookDate: [new Date().toISOString(), Validators.required],
            startTime: ['09:00', Validators.required],
            endTime: ['10:00', Validators.required]
        });

        //this.bookingForm.setValue(this.booking);
}

  ionViewDidLoad() {
    console.log('xx1');

  }

  submitForm() {
    this.storage.get
    this.storage.get("booking").then((val) => {
        if(val == null) {
            console.log('null');
            let x = [];
            x.push({'name':'wiyanto'});
            this.storage.set("booking",x);
        } else {
            val.push({'name':'wiyanto123'});
            this.storage.set("booking",val);
        }
    });
    console.log('open calendar '+JSON.stringify(this.bookingForm.value));
  }

}

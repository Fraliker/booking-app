import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BookingDataProvider } from '../../providers/booking-data/booking-data';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import * as Moment from "moment";
/**
 * Generated class for the RoomBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var $:any;

@IonicPage()
@Component({
  selector: 'page-room-booking',
  templateUrl: 'room-booking.html',
})
export class RoomBookingPage {

  @ViewChild("bookStartTime", {read: ElementRef}) bookStartTime:ElementRef;
  @ViewChild("bookEndTime", {read: ElementRef}) bookEndTime:ElementRef;

  eventSource;
  viewTitle;
  enableDelete = false;
  enableCheckin = false;
  bookingForm: FormGroup;
  idValue;
  startTimeDialog;
  endTimeDialog;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
   private storage: Storage, public bookingDataProvider: BookingDataProvider, public alertCtrl: AlertController,
   private renderer: Renderer) {
    this.initForm(this.navParams.data);
  }

  ionViewDidLoad() {

    console.log(this.bookStartTime.nativeElement);

    const that = this;

    $(this.bookStartTime.nativeElement).clockpicker({
      autoclose: true,
      placement: 'right', 
      afterDone: function(val) {
          that.bookingForm.controls['bookStartTime'].setValue(val);
          const splitVal = val.split(':');
          const selectedTime = Moment();
          selectedTime.set('hour',+splitVal[0]);
          selectedTime.set('minute',+splitVal[1]);
          selectedTime.add(1,'hour');
          that.bookingForm.controls['bookEndTime'].setValue(selectedTime.format('HH:mm'));
      }
    }); 

    $(this.bookEndTime.nativeElement).clockpicker({
      autoclose: true,
      placement: 'right', 
      afterDone: function(val) {
          that.bookingForm.controls['bookEndTime'].setValue(val);
      }
    }); 
    // this.renderer.listen(this.bookStartTime.nativeElement,'onOk', function(val) {
    //     //console.log('onok' + that.startTimeDialog.time);
    //     that.bookingForm.controls['bookStartTime'].setValue(that.startTimeDialog.time.format('HH:mm'));
    // });

    // this.renderer.listen(this.bookEndTime.nativeElement,'onOk', function(val) {
    //     that.bookingForm.controls['bookEndTime'].setValue(that.endTimeDialog.time.format('HH:mm'));
    // });

    // this.startTimeDialog = new mdDateTimePicker.default({
    //       type: 'time',
    //       trigger: this.bookStartTime.nativeElement
    // });

    // this.endTimeDialog = new mdDateTimePicker.default({
    //       type: 'time',
    //       trigger: this.bookEndTime.nativeElement
    // });

  }

  initForm(initialValue) {
    if(initialValue.id) {
      this.idValue = { id : initialValue.id };
      this.enableDelete = true;

      let eventStartTime = Moment(initialValue.startTime);
      let eventMaxStartTime = eventStartTime.clone().add(10,'minutes');
      let eventMinStartTime = eventStartTime.clone().subtract(15,'minutes');
      let now = Moment();
      if(now.isBetween(eventMinStartTime,eventMaxStartTime)) {
          this.enableCheckin = true;
      }
    }
    this.bookingForm = this.formBuilder.group({
      fullName: [initialValue.fullName, Validators.required],
      room: [initialValue.room, Validators.required],
      bookDate: [new Date(initialValue.bookDate).toISOString(), Validators.required],
      bookStartTime: [initialValue.bookStartTime, Validators.required],
      bookEndTime: [initialValue.bookEndTime, Validators.required],
    });
  }

  submitForm() {

    let bookingFormValue = { ...this.bookingForm.value, ...this.idValue };
    console.log(bookingFormValue);
    this.bookingDataProvider.save(bookingFormValue).then(data => {
      //this.initForm();
      this.showAlert('Successfully booked the room');
      this.navCtrl.pop();
    });
  }

  delete() {
    this.bookingDataProvider.delete(this.idValue.id).then( data => {
      this.showAlert('Successfully cancelled the room');
      this.navCtrl.pop();
    }
    );
  }

  checkIn() {
    this.bookingDataProvider.checkIn(this.idValue.id).then( data => {
      this.showAlert('Successfully check in the room');
      this.navCtrl.pop();
    }
    );
  }

  adjustEndTime(e) {
    let hour = `${e.hour+1}`;
    hour = hour.length==1 ? `0${hour}`:hour;

    let minute = `${e.minute}`;
    minute = minute.length==1 ? `0${minute}`:minute;
    this.bookingForm.patchValue({bookEndTime: `${hour}:${minute}`});
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showStartTimeDialog(event) {
    // const val:string = event.target.value;
    // if(!val) return;
    // const splitVal = val.split(':');
    // const selectedTime = Moment();
    // selectedTime.set('hour',+splitVal[0]);
    // selectedTime.set('minute',+splitVal[1]);
    // this.startTimeDialog.time = selectedTime;
    // this.startTimeDialog.toggle();
  }

  // showEndTimeDialog(event) {
  //   const val:string = event.target.value;
  //   if(!val) return;
  //   const splitVal = val.split(':');
  //   const selectedTime = Moment();
  //   selectedTime.set('hour',+splitVal[0]);
  //   selectedTime.set('minute',+splitVal[1]);
  //   this.endTimeDialog.time = selectedTime;
  //   this.endTimeDialog.toggle();
  // }

}

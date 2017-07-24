The offline booking hybrid application running in iPad/Android device. The application is built on ionic 2 framework.

## Features
* Allow user to book the meeting room in SG IC
* Allow user to manage booking record
* Calendar display in 3 different views : day, week and month
* Check-in action is required prior starting booking time
* Automatic deletion of the booking record for those missed the check-in
* Always on display between 8am - 7pm. However to awake the screen from sleeping, it requires user to unlock iPad and open the app

## Technologies

* [Ionic 2 Framework](https://ionicframework.com)
* [Ionic Storage](https://ionicframework.com/docs/storage/)
* [Typescript](https://www.typescriptlang.org/)
* [Ionic2-Calendar](https://github.com/twinssbc/Ionic2-Calendar)
* [jQuery clockpicker](https://weareoutman.github.io/clockpicker/)

## Software requirements to build and run

* Node/NPM
* Install Cordova, Ionic, Typescript NPM package
 * `npm install -g cordova ionic typescript`
* Chrome (to run in browser)
 * `ionic serve`
* Xcode (to run natively in iOS emulator)
 * `ionic cordova run ios`

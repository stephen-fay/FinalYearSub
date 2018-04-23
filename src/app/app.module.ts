import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/popover/popover';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../providers/auth/auth';
import { Firebase } from '@ionic-native/firebase';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {LogOutPage} from '../pages/log-out/log-out';
import {EquipmentHandoverPage} from '../pages/equipment-handover/equipment-handover';
import {AddEquipmentPage} from '../pages/add-equipment/add-equipment';
import {UserDirectoryPage} from '../pages/user-directory/user-directory';
import {AdminControlPage} from '../pages/admin-control/admin-control';
import {EquipmentDirectoryPage} from '../pages/equipment-directory/equipment-directory';
import {NewUserPage} from '../pages/new-user/new-user';
import {NewEquipmentPage} from '../pages/new-equipment/new-equipment';

import * as firebase from 'firebase';
import {CallNumber} from '@ionic-native/call-number';
import { DatabaseProvider } from '../providers/database/database';
//var admin = require("firebase-admin");
import * as admin from 'firebase-admin';
var serviceAccount = require("../test1-5d55c-firebase-adminsdk-krrlp-66057239f4.json");
//import { HttpProvider } from '../providers/http/http';
// Initialize Firebase

var config = {
  apiKey: "AIzaSyAtI8dRFtL0yhZMvtKf_vJsxwwHlvS9rL8",
  authDomain: "test1-5d55c.firebaseapp.com",
  databaseURL: "https://test1-5d55c.firebaseio.com",
  projectId: "test1-5d55c",
  storageBucket: "test1-5d55c.appspot.com",
  messagingSenderId: "462003129132"
};
firebase.initializeApp(config);
console.log(serviceAccount);
admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.cert({
    projectId: 'test1-5d55c',
    clientEmail: 'firebase-adminsdk-krrlp@test1-5d55c.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJnkzQ6TOKeSC+\n/aoK/DsOigTBpXZuM0rDsFXh62ED2rHytv7E4vE0xu/XcfDPSQVsjcyn9O2gDOrU\nnuhjBS4A/SOzL9EovdmuqBtvmBfZ7yPHJkGwUduyvSiwT66Xwp8UNSW6VGs7DsB3\neSI1vg8GcJ7DuJfWIjLzwPqj1uciv7Qryw9fYk9oN8z3PXpTEHv/Nnly4PhoSpYa\n0L4i4wO1JijwSQfBlph3T6dfzKDgIoWp7BC82v7E/0KCM+vjaWXSsjfapqOGwPdE\nBIEn4AbRoQkBTsb3Ak2OhL4AGWTj7t8OtUAUZaPMFfoHN8HW3tc74jby9K9JHLaB\nCpRJovcbAgMBAAECggEADGUT+d/sUD4EGlnD42sAQnOPuUvvzPSQSxmDHiF3VGJU\ngERpwzbkd0cnpYoWsNefYr4Q795p4WYJ5cpjJPtDicIGONTeue95+3fQP/sMtFQ0\nUeDzNuDBbeqdHsG3TRMk7nwZ9quL8BSHFpE23jDyAYZY7FVj2EE/+qZJglsK2KLu\neY5sZ1bb+BH7wx2BNOQOxCs2NWZrXw8FbjRTM3yrEUGNp/O7YsRZ/Rxxsd5cqaV9\nMsVVZbEbTd8lKpmRHSgogZTmLvcWkq/l8fcYFn7hhYqmxe5UdxULQinU1GZiLnVC\nJbP+wHWM3r0JLtLPpMvOF7nFRH9QeeqXC1+k1JyLKQKBgQDwJURuEWwV3VUMEggx\nhR0emgnLS1sdrPVj0B48qy7BYJl2OrX2kmRIi++t28GuSdt90hEUcPb1Q7b1RKcY\nWsSd37ZNCcH357oNdt9OnxHt/B8BtuNF3T0vbZQECx/qwJI8ujX0JBS+cntCi5p6\nite/jvOig6m43H/P78ALa2s4RwKBgQDW7eEMkvLmsRNvbn/sM9nYAwH1N03kCqsi\nVD5kwn+MvVmeN62rLAlIAtthYftpBhjY70SDga0z817bE5FK0I2MDE98hTNch2yJ\nOvBUTMMqye7Jrx+Ms8HKwHteot4+zW3AUrWHw5CrIS/5w2oJPncekU0QMT3Pxxa1\nQ2lm27dIjQKBgQCycz8Se6fR55MXUR79jWlCID0+8FRZDPmcnj6Z3qrz0BC5po8p\nF0emETad/ztBhGiyarN+eSNKxnLid42jr2+D0YXqYWHeEjhTYQ43okT0j/GKmJjy\nhaC96bOf/ZROIaOJtOX68gToMLIflRXKEfqYwmWRUj2AvXnMzt/qnHwkaQKBgD3c\ng+zpks5BY1WsWVdz6RyaaQLaYynixDUCSF8Z+Dpa+aNnZS4iY519bQVPfVxSK+6s\nl2y+c0rDnqaxsBz3f/YySOKPOCRGuj+ZXjj1SytSqc8U/6Cw0HN6CUhI2mz7Fb7I\nT4V/DXGkALoDu85jU0fSDHs/oQnfxLJxb7HyRYO1AoGBAKU4pcphlbLU/Iis7WJP\n89BKiI7kFkGOo6vokPXlAON0GOkv3CTvrhtb6PF1ULvGDAgNp+M+fM+Eo/VAx+yL\nh0JJcAU0JHclx5ITxrtRcewtc96mLfA1/A23I7/lCzUVen569t/pgTM2/7rKzmX2\nbNQFNd06qwZSEAC5cn0jPfNc\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: "https://test1-5d55c.firebaseio.com"
});

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    AdminControlPage,
    HomePage,
    MapPage,
    PopoverPage,
    SignUpPage,
    LogOutPage,
    NewUserPage,
    NewEquipmentPage,
    UserDirectoryPage,
    EquipmentDirectoryPage,
    EquipmentHandoverPage,
    NewUserPage,
    NewEquipmentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    AdminControlPage,
    SignUpPage,
    PopoverPage,
    HomePage,
    MapPage,
    LogOutPage,
    UserDirectoryPage,
    EquipmentDirectoryPage,
    EquipmentHandoverPage,
    NewUserPage,
    NewEquipmentPage
  ],
  providers: [
    CallNumber,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    AuthProvider,
    DatabaseProvider
  ]

})
export class AppModule {}

import { Component, ViewChild } from '@angular/core';
import { Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import * as firebase from '../plugins/cordova-plugin-firebase';
import firebase from 'firebase';
import Geofire from 'geofire';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { Nav } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {EquipmentHandoverPage} from '../pages/equipment-handover/equipment-handover';
import {AddEquipmentPage} from '../pages/add-equipment/add-equipment';
import {UserDirectoryPage} from '../pages/user-directory/user-directory';
import {AdminControlPage} from '../pages/admin-control/admin-control';
import { DatabaseProvider } from '../providers/database/database';
//export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = MapPage;
  //rootPage: any;

  geoFire=new Geofire(firebase.database().ref('locations'));

   pages: Array<{title: string, component: any, icon: string}>;
   adminPages: Array<{title: string, component: any, icon: string}>;
   login: Array<{component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public geolocation:Geolocation, menu: MenuController, public db: DatabaseProvider) {

  //  this.putAed();

    this.geolocation.getCurrentPosition().then((resp) => {
         console.log(resp.coords.latitude);
         this.db.currentLatitude = resp.coords.latitude;
         this.db.currentLongitude = resp.coords.longitude;
    }).catch((error) => {
         console.log(error);
    });

    var self=this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            menu.enable(true, 'authenticated');
            menu.enable(false, 'admin');
            menu.enable(false, 'unauthenticated');
            var query=firebase.database().ref().child('/users/'+user.uid+'/isAdmin');
            query.once('value')
              .then(snap=>{
                if(snap.val()==true){
                  self.db.admin=true;
                  menu.enable(false, 'authenticated');
                  menu.enable(false, 'unauthenticated');
                  menu.enable(true, 'admin');
				  var memberQuery=firebase.database().ref().child('/users/'+user.uid+'/memberOf');
				  memberQuery.once('value')
					.then(memberSnap=>{
						self.db.memberOf=memberSnap.val();
					});
                }
              });
            console.log("logged in");
        } else {
            console.log("logged out");
            menu.enable(false, 'authenticated');
            menu.enable(false, 'admin');
            menu.enable(true, 'unauthenticated');
        }
    });

     this.login = [
            { component: LoginPage }
     ];

     this.pages = [
            { title: 'Equipment Handover',
              component: EquipmentHandoverPage,
              icon: "swap" }/*,
            { title: 'Add Equipment',
                component: AddEquipmentPage,
                icon: "medkit" }*/
     ];
     this.adminPages = [
      {
        title: 'Admin Control',
        component: AdminControlPage,
        icon: 'user'
      }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });



}
    //firebase.initializeApp(config);

    //console.log(firebase.database());
    putAed(){
      var query=firebase.database().ref('/features/features');
      var me=this;
      query.once('value')
        .then(parentSnap =>{
          console.log(parentSnap.val());
          parentSnap.forEach(function(snap){
            console.log(snap.val().geometry);
            console.log(snap.val());
            me.geoFire.set(snap.key, [snap.val().geometry.coordinates["0"], snap.val().geometry.coordinates["1"]]).then(function(){
              console.log("success");
            }, function(error){
              console.log("error");
          });
        });
    });
  }

  openPage(p) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(p.component);
  }

  logout(){
     firebase.auth().signOut();
  }

}

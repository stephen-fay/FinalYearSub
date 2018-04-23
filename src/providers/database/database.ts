import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import firebase from 'firebase';
import Geofire from 'geofire';
import {AuthProvider} from '../../providers/auth/auth';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  currentLatitude: number;
  currentLongitude: number;
    aedLocals: Array<{ AED: any, distance: number }>
  geoFire=new Geofire(firebase.database().ref('locations'));

  memberOf: any;
  admin = false;


  constructor(public events: Events, public auth: AuthProvider) {
    console.log('Hello DatabaseProvider Provider');
  }

  getRequestedaedLocals(distance, currentLat, currentLong){
      console.log(currentLat);
      this.aedLocals = [];
      console.log(currentLat);
      this.currentLatitude=currentLat;
      this.currentLongitude=currentLong;
      var geoQuery = this.geoFire.query({
        center: [currentLong, currentLat],
        radius: distance //kilometers
      });

      var aedLocal = {};
      var aedLocals = [];
      var me=this;

      geoQuery.on("key_entered", function(key, location, distance) {
          aedLocal = {
              id: key,
              distance: distance,
              location: location
          };


          var query = firebase.database().ref('/features/features').child(key);
          query.once('value')
               .then(snap => {
                 //console.log(snap.val());
                  me.aedLocals.push({AED:snap.val(),distance:distance});
                  me.events.publish('new aedLocal', aedLocal, Date.now());
                  me.events.publish('aedLocal:entered',aedLocal,Date.now());
          });
      });
      this.aedLocals = me.aedLocals
      this.events.publish('aedLocal:entered',this.aedLocals,Date.now());

}
updateDistancePreference(distance){
  console.log(firebase.auth().currentUser.uid);
  if(firebase.auth().currentUser!=undefined){
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/'+uid).child('distancePreference').set(distance);
  }
}
getPreferredDistance(){
    var uid = firebase.auth().currentUser.uid;
    var query = firebase.database().ref('/users/'+uid);
    query.once('value')
      .then(snap => {
        if(snap.val().distancePreference!=undefined){
          console.log("defined");
          return snap.val().distancePreference;
        }
        else{
          console.log("undefined");
          return 5;
        }
      });
    }
}

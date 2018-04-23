import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams, Events } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { PopoverPage } from '../popover/popover';

import { Geolocation } from '@ionic-native/geolocation';
//import l from "leaflet";
//declare var L: any;
import "leaflet"
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

import firebase from 'firebase';

declare var L: any;


//import {Injectable} from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'

})
export class MapPage {
  map: L.Map;
  path: any;
  markers = [];
  aedLocals: Array<{ AED: any, distance: number }>
  center: L.PointTuple;
  currentLatitude: number;
  currentLongitude: number;
  stateListener: any;


  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public geolocation:Geolocation, public db: DatabaseProvider, public actionSheetCtrl: ActionSheetController, public popoverCtrl: PopoverController, public auth: AuthProvider) {
	events.subscribe('aedLocal:entered', (time)=>{
      this.aedLocals=this.db.aedLocals;
      for(let marker of this.markers){
          this.map.removeLayer(marker);
      }
      for(let aedLocal of this.aedLocals){
        this.markLocations(aedLocal);
      }
    });
    /*this.geolocation.getCurrentPosition().then((resp) => {
         console.log(resp.coords.latitude);
         this.db.currentLatitude = resp.coords.latitude;
         this.db.currentLongitude = resp.coords.longitude;
         this.center=[resp.coords.latitude, resp.coords.longitude];
         this.initMap();
         console.log(distance);
         this.db.getRequestedaedLocals(distance, resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
         console.log(error);
        // this.db.getRequestedaedLocals(53.3813572, -6.5940997, 5, this.buildingType, this.status);
    });*/
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //if(this.auth.getCurrentUser()!=undefined){
	this.map = L.map('map', {
	  center: [53.42529, -7.953779],
	  zoom: 16
	});
    var me=this;
    this.stateListener = firebase.auth().onAuthStateChanged(user => {
      if(user){
        var uid = firebase.auth().currentUser.uid;
        var query = firebase.database().ref('/users/'+uid);
        query.once('value')
          .then(snap => {
            this.db.memberOf=snap.val().memberOf;
            this.db.admin=snap.val().isAdmin;
            if(snap.val().distancePreference!=undefined){
                    console.log(snap.val().distancePreference);
                    this.geolocation.getCurrentPosition().then((resp) => {
                       console.log(resp.coords.latitude);
                       this.center=[resp.coords.latitude, resp.coords.longitude];
                       this.initMap();
                       this.db.getRequestedaedLocals(parseInt(snap.val().distancePreference), resp.coords.latitude, resp.coords.longitude);
                  }).catch((error) => {
                       console.log(error);
                      // this.db.getRequestedaedLocals(53.3813572, -6.5940997, 5, this.buildingType, this.status);
                  });
            }
            else{
              this.geolocation.getCurrentPosition().then((resp) => {
                 this.center=[resp.coords.latitude, resp.coords.longitude];
                 this.initMap();
                 this.db.getRequestedaedLocals(5, resp.coords.latitude, resp.coords.longitude);
            }).catch((error) => {
                 console.log(error);
                // this.db.getRequestedaedLocals(53.3813572, -6.5940997, 5, this.buildingType, this.status);
            });
            }
          });
    }
    else{
      this.geolocation.getCurrentPosition().then((resp) => {
         this.center=[resp.coords.latitude, resp.coords.longitude];
         this.initMap();
         this.db.getRequestedaedLocals(100, resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
         console.log(error);
        // this.db.getRequestedaedLocals(53.3813572, -6.5940997, 5, this.buildingType, this.status);
    });
    }
    me.stateListener = null;
  });
}




  markLocations(aedLocal){
    var units = 'km';
    var distance = aedLocal.distance;
    if (aedLocal.distance < 1.0)
    {  units = 'm';
      distance = distance * 1000;
    }
    var marker=L.marker([aedLocal.AED.geometry.coordinates["1"],aedLocal.AED.geometry.coordinates["0"]]);
    //marker.bindPopup('This Aed is : ' + String(distance.toFixed(1)) + ' ' + units + ' away.');    this.map.addLayer(marker);

    this.markers.push(marker);

    var me=this;
    marker.on("click", function(e){
      const actionSheet = me.actionSheetCtrl.create({
         title: "Defibrillator",
         buttons: [
           {
             icon: 'compass',
             text: 'Get Directions ('+String(distance.toFixed(1))+units+' away)',
             role: 'destructive',
             handler: () => {
               if(me.path!=undefined){
                 console.log("removing");
                 me.map.removeControl(me.path);
               }
               me.path=L.Routing.control({

                  waypoints: [
					  L.latLng(me.center[0],me.center[1]),
                      L.latLng(aedLocal.AED.geometry.coordinates["1"],aedLocal.AED.geometry.coordinates["0"])
                  ],
                 router: L.Routing.graphHopper('51df5f49-151e-4aa1-903d-02ce4b088ea2', {
                   urlParameters: {
                     vehicle: 'foot'
                   }
                 })
             }).addTo(me.map);
             }
           }
         ]
       });
       actionSheet.present();
    });

    this.map.addLayer(marker);

    /*L.Routing.control({
    waypoints: [
        L.latLng(aedLocal.AED.geometry.coordinates["1"],aedLocal.AED.geometry.coordinates["0"]),
        L.latLng(this.center[0],this.center[1])
    ]
}).addTo(this.map);*/
  }


  initMap() {
	if(this.map==undefined){
		this.map = L.map('map', {
		  center: this.center,
		  zoom: 16
		});
	}
	else{
		this.map.panTo(this.center);
		this.map.setZoom(16);
	}

    var myIcon = L.icon({
    iconUrl: '/assets/images/pin.png',
    iconSize: [25, 45],
    iconAnchor: [12, 45],
    popupAnchor: [0, -45]
});



  L.marker((this.center), {icon: myIcon}).addTo(this.map).bindPopup('You Are Here.<br>')  .openPopup();



    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
  }

 presentPopover(event){
   let popover = this.popoverCtrl.create(PopoverPage, {
     id: "Hello"
   });
   popover.present({
     ev : event
   });
 }
}

import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import {NewEquipmentPage} from '../new-equipment/new-equipment';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
/**
 * Generated class for the EquipmentDirectoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-equipment-directory',
  templateUrl: 'equipment-directory.html',
})
export class EquipmentDirectoryPage {

  equipment=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public db: DatabaseProvider) {
      this.getEquipment();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDirectoryPage');
  }

  addEquipment(){
    //this.navCtrl.push(NewEquipmentPage);
    this.appCtrl.getRootNav().push(NewEquipmentPage);
  }

  getEquipment(){
      var query=firebase.database().ref().child(this.db.memberOf+'/Equipment/');
      var self=this;
      query.on("child_added", function(added){
          self.equipment.push(added.val());
      });
      query.on("child_removed", function(removed){
        self.equipment=self.equipment.filter(eq => eq.id !== removed.val().id);
      });
	  query.on("child_changed", function(changed){
		  self.equipment=self.equipment.filter(eq=> eq.id!=changed.val().id);
		  self.equipment.unshift(changed.val());
	  });
  }
  editEquipment(e){
	  this.appCtrl.getRootNav().push(NewEquipmentPage, {equipment: e});
  }

}

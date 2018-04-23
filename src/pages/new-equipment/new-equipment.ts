import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
/**
 * Generated class for the NewEquipmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-equipment',
  templateUrl: 'new-equipment.html',
})
export class NewEquipmentPage {

  private equipment: FormGroup;
  equip: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public db: DatabaseProvider) {
	if(navParams.get("equipment")==undefined){	
		this.equipment=this.formBuilder.group({
		  pad1Expiry: ['', Validators.compose([Validators.required])],
		  pad2Expiry: ['', Validators.compose([Validators.required])],
		  batteryExpiry: ['', Validators.compose([Validators.required])],
		  id: ['', Validators.compose([Validators.required])]
		});
	}
	else{
		this.equip=navParams.get("equipment");
		this.equipment=this.formBuilder.group({
		  pad1Expiry: [this.equip.pad1Expiry, Validators.compose([Validators.required])],
		  pad2Expiry: [this.equip.pad1Expiry, Validators.compose([Validators.required])],
		  batteryExpiry: [this.equip.batteryExpiry, Validators.compose([Validators.required])],
		  id: [this.equip.id, Validators.compose([Validators.required])]
		});
	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEquipmentPage');
  }

  addNewEquipment(){
    firebase.database().ref().child(this.db.memberOf+'/Equipment/'+this.equipment.value.id).set({
		id: this.equipment.value.id, 
		pad1Expiry: this.equipment.value.pad1Expiry, 
		pad2Expiry: this.equipment.value.pad2Expiry, 
		batteryExpiry: this.equipment.value.batteryExpiry});
	this.navCtrl.pop();
  }

}

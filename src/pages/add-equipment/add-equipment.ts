import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';

/**
 * Generated class for the AddEquipmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-equipment',
  templateUrl: 'add-equipment.html',
})
export class AddEquipmentPage {
      private addEquipmentForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder : FormBuilder) {
    this.addEquipmentForm = this.formBuilder.group({
      SerialNumber: [''],
      unitId: [''],
      Pad1ExpDate:[''],
      Pad2ExpDate:[''],
      BatteryExpDate:[''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEquipmentPage');
  }

}

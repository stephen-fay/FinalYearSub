import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserDirectoryPage} from '../user-directory/user-directory';
import {EquipmentDirectoryPage} from '../equipment-directory/equipment-directory';

/**
 * Generated class for the AdminControlPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-control',
  templateUrl: 'admin-control.html',
})
export class AdminControlPage {

  tab1Root: any = UserDirectoryPage;
  tab2Root: any = EquipmentDirectoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminControlPage');
  }

}

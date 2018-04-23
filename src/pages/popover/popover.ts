import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  private distance;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
      this.distance=5;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  update(){

    this.db.updateDistancePreference(this.distance);
    this.db.getRequestedaedLocals(this.distance, this.db.currentLatitude, this.db.currentLongitude);
  }

}

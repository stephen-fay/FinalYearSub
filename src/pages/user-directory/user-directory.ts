import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import {NewUserPage} from '../new-user/new-user';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the UserDirectoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-directory',
  templateUrl: 'user-directory.html',
})
export class UserDirectoryPage {
	
	employees=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public db: DatabaseProvider, public callNumber: CallNumber) {
	  this.getMembers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDirectoryPage');
  }
  
  getMembers(){
	  console.log(this.db.memberOf);
	var query=firebase.database().ref('Leinster/Dublin/North county Dublin/Blanchardstown/Memberships');
	
	var me=this;

	query.on("child_removed", function(removeSnap){
		me.employees=me.employees.filter(obj => obj.id !== removeSnap.val().userID);
	});

	query.on("child_added", function(addSnap){

		var userQuery = firebase.database().ref('/users/').child(addSnap.val().userID);
			userQuery.once('value')
				.then(userSnap=>{
					console.log(userSnap.val());
					me.employees.unshift(userSnap.val());
				});
				
	});
	
	query.on("child_changed", function(removeSnap){
		me.employees=me.employees.filter(obj => obj.id !== removeSnap.val().userID);
		me.employees.unshift(removeSnap.val());
	});
  }
  
  call(number){
	  this.callNumber.callNumber(number, true)
		.then(res => console.log("Launched dialer"))
		.catch(err => console.log("Error"));
  }
  
  addMember(){
    //this.navCtrl.push(NewUserPage);
    this.appCtrl.getRootNav().push(NewUserPage);
  }
}

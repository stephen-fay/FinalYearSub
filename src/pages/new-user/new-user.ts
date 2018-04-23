import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';
import * as admin from 'firebase-admin';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the NewUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {

  private user: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public db: DatabaseProvider) {
      this.user=this.formBuilder.group({
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        phoneNumber: ['', Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
  }
  addNewUser(){
	var me=this;
    console.log("adding");
      /*firebase.auth().createUserWithEmailAndPassword(this.user.value.email, this.user.value.password)
                          .then( newUser => {
                                firebase.database().ref('/users').child(newUser.uid).set({ firstName: this.user.value.firstName, lastName: this.user.value.lastName, email: this.user.value.email, phone: this.user.value.phoneNumber,  memberOf: this.db.memberOf});
                                firebase.database().ref(this.db.memberOf+'/'+newUser.uid).set({userID: newUser.uid});
                                //return newUser.updateProfile({displayName: firstname});
                          }).catch(function(error) {
                                console.log(error);
                          });*/
        admin.auth().createUser({
          email: this.user.value.email,
          password: this.user.value.password,
          displayName: this.user.value.firstName,
          phoneNumber: this.user.value.phone,
          emailVerified: true
        }).then(function(userRecord) {
			firebase.database().ref('/users').child(userRecord.uid).set({ firstName: me.user.value.firstName, lastName: me.user.value.lastName, email: me.user.value.email, phone: me.user.value.phoneNumber,  memberOf: me.db.memberOf});
            firebase.database().ref(me.db.memberOf+'/Memberships/'+userRecord.uid).set({userID: userRecord.uid});
			console.log("Successfully created new user:", userRecord.uid);
			me.navCtrl.pop();
		  })
		  .catch(function(error) {
			console.log("Error creating new user:", error);
		  });
  }
}

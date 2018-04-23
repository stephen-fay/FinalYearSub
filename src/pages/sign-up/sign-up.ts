import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase';

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private signUpForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder : FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      phone: [''],
      email: ['', Validators.required],
      password: [''],
      name:['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  regUser(){
    firebase.auth().createUserWithEmailAndPassword(this.signUpForm.value.email, this.signUpForm.value.password)
    .then( newUser => {
          firebase.database().ref('/users').child(newUser.uid).set({ email: this.signUpForm.value.email, phone: this.signUpForm.value.phone, name: this.signUpForm.value.name, accountStatus: "pending" });
          return newUser.updateProfile({displayName: this.signUpForm.value.name});
    }).catch(function(error) {
          console.log(error);
    });
  }

  signupUser(firstname: string, surname: string, email: string, password: string): Promise<any> {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then( newUser => {
                                  firebase.database().ref('/users').child(newUser.uid).set({ email: email,  });
                                  return newUser.updateProfile({displayName: firstname});
                            }).catch(function(error) {
                                  console.log(error);
                            });
    }


}

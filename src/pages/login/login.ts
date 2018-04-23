import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {SignUpPage} from '../../pages/sign-up/sign-up';

import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

private loginForm : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder : FormBuilder, public auth: AuthProvider, public alertCtrl: AlertController, public events: Events) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  goToSignup(){

    this.navCtrl.push(SignUpPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser() {
    this.auth.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then(authData =>{
        this.events.publish("user:login");
        this.navCtrl.pop();
      }, error => {
        let alert=this.alertCtrl.create({
          message: error,
          buttons: [{
            text: "Ok",
            role: 'cancel'
          }]
        });
        alert.present();
      });
  }
}

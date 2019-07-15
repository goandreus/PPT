import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginAdminPage} from "../login-admin/login-admin";
import {LoginUserPage} from "../login-user/login-user";
import {BackgroundMode} from "@ionic-native/background-mode";

@Component({
  selector: 'page-seleccion',
  templateUrl: 'seleccion.html',
})
export class SeleccionPage {

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode, public navParams: NavParams) {
    this.backgroundMode.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionPage');
  }
  nextPageCreateAccountAdmin(){
    this.navCtrl.push(LoginAdminPage);
  }
  nextPageCreateAccountUser(){
    this.navCtrl.push(LoginUserPage);
  }

}

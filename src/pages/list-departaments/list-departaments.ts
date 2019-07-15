import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ListArchivesPage} from "../list-archives/list-archives";
import {SeleccionPage} from "../seleccion/seleccion";
import {BackgroundMode} from "@ionic-native/background-mode";

@Component({
  selector: 'page-list-departaments',
  templateUrl: 'list-departaments.html',
})
export class ListDepartamentsPage {

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode, public navParams: NavParams, public alertCtrl: AlertController) {
    this.backgroundMode.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDepartamentsPage');
  }
  nextPageDepartament(idDepartament) {
    console.log("idDepartament: "+idDepartament);
    this.navCtrl.push(ListArchivesPage, {idDepartament:idDepartament});

  }
  closeSesion() {
    let alert = this.alertCtrl.create({
      title: 'Salir:',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            localStorage.removeItem("coronelData");
            //window.localStorage.clear();
            this.navCtrl.setRoot(SeleccionPage);
          }
        }
      ]
    });
    alert.present();
  }

}

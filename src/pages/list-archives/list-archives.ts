import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {RestapiProvider} from "../../providers/restapi/restapi";
import {SeleccionPage} from "../seleccion/seleccion";
import {BackgroundMode} from "@ionic-native/background-mode";

@Component({
  selector: 'page-list-archives',
  templateUrl: 'list-archives.html',
})
export class ListArchivesPage {
  idDepartament: any;
  list: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private iab: InAppBrowser,
              public alertCtrl: AlertController,
              private backgroundMode: BackgroundMode,
              private restApi: RestapiProvider) {
    this.backgroundMode.enable();
    this.idDepartament =this.navParams.data.idDepartament;
    console.log(this.idDepartament);
  }
 
  async ionViewWillEnter() {
    await this.all();
  }

  open(data) {
    //let url = encodeURIComponent(data.url);
    this.iab.create('https://docs.google.com/viewer?url=' + data.url);
  }

  async all() {
    let formData = new FormData();
    formData.append('op', '2');
    formData.append('departmentId',this.idDepartament);
    await this.restApi.insertArchive(formData).then((data) => {
      this.list = data;
      console.log(data);
    });
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

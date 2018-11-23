import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestapiProvider} from "../../providers/restapi/restapi";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  list: any;

  constructor(public navCtrl: NavController,
              private iab: InAppBrowser,
              private restApi: RestapiProvider) {

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
    await this.restApi.insertArchive(formData).then((data) => {
      this.list = data;
      console.log(data);
    });
  }

}

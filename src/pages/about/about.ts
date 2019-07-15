import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestapiProvider} from "../../providers/restapi/restapi";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  file: File;
  frmUploadPpt: FormGroup;

  constructor(public navCtrl: NavController,
              private restApi: RestapiProvider) {
    this.frmUploadPpt = new FormGroup({
      file: new FormControl(null, Validators.required),
    });
  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  async uploadPpt() {
    let formData = new FormData();
    formData.append('op', '1');
    formData.append('type', 'PPT');
    formData.append('file', this.file);
    await this.restApi.insertArchive(formData).then((data) => {
      console.log(data);
    });
  }

}

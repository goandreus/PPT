import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestapiProvider} from "../../providers/restapi/restapi";
import {SeleccionPage} from "../seleccion/seleccion";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {BackgroundMode} from "@ionic-native/background-mode";

@Component({
  selector: 'page-register-ppt',
  templateUrl: 'register-ppt.html',
})
export class RegisterPptPage {
  file: File;
  name_archive: string;
  frmUploadPpt: FormGroup;
  loginData: any;
  list: any;

  constructor(public navCtrl: NavController,
              private iab: InAppBrowser,
              private toastCtrl: ToastController,
              private backgroundMode: BackgroundMode,
              public alertCtrl: AlertController,
              private restApi: RestapiProvider) {
    this.backgroundMode.enable();
    this.loginData = JSON.parse(localStorage.getItem('jefeDepartamentoData'));
    console.log(this.loginData[0].name_user);
    this.frmUploadPpt =  new FormGroup({
      name_archive: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required),
    });
  }

  @ViewChild('filechooser') fileChooser1: ElementRef;
  items: File[] = [];

  ionViewDidLoad(){
    const wireUpFileChooser = () => {
      const elementRef = this.fileChooser1.nativeElement as HTMLInputElement;
      elementRef.addEventListener('change', (evt: any) => {
        const files = evt.target.files as File[];
        this.file = evt.target.files[0];
        for (let i = 0; i < files.length; i++) {
          console.log(this.items.push(files[i]));
          this.items.push(files[i]);
        }
      }, false);
    }
    wireUpFileChooser();
  }

  async uploadPpt() {
    if(this.file == undefined){
      this.message("Falta Cargar PPT");
    } else {
      let formData = new FormData();
      formData.append('op', '1');
      console.log(this.frmUploadPpt.value.name_archive);
      formData.append('name', this.items[0].name);
      formData.append('userId', this.loginData[0].iduser);
      formData.append('type', 'PPT');
      console.log("kkkkkkk"+this.file);
      formData.append('file', this.file);
      await this.restApi.insertArchive(formData).then((data) => {
        console.log(data);
        this.loginData = data;
        if(this.loginData.status === true) {
          this.message("Se registro correctamente");
          this.navCtrl.setRoot(RegisterPptPage);
        } else {
          this.message("No se registro");
        }
      });
    }
  }
  async deletePpt(idArchive) {
    let formData = new FormData();
    formData.append('op', '3');
    formData.append('id', idArchive);
    await this.restApi.deleteArchive(formData).then((data) => {
      console.log("lll"+data);
      this.loginData = data;
      if(this.loginData.status === true) {
        this.message("Se elimino el archivo correctamente");
        this.navCtrl.setRoot(RegisterPptPage);
      } else {
        this.message("No se elimino");
      }
    });
  }
  alertDeleteArchive(idArchive){
    let alert = this.alertCtrl.create({
      title: 'Eliminar:',
      message: '¿Estás seguro de que deseas eliminar el archivo?',
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
            this.deletePpt(idArchive);
          }
        }
      ]
    });
    alert.present();
  }
  message(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
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
    formData.append('op', '4');
    formData.append('userId',this.loginData[0].iduser);
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
            localStorage.removeItem("jefeDepartamentoData");
            //window.localStorage.clear();
            this.navCtrl.setRoot(SeleccionPage);
          }
        }
      ]
    });
    alert.present();
  }
}

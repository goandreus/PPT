import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackgroundMode} from "@ionic-native/background-mode";
import {RestapiProvider} from "../../providers/restapi/restapi";
import {SeleccionPage} from "../seleccion/seleccion";

@Component({
  selector: 'page-create-account-user',
  templateUrl: 'create-account-user.html',
})
export class CreateAccountUserPage {
  FrmLogin: FormGroup;
  tabBarElement : any;
  loginData : any;  
  data: any;

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode, private alertCtrl: AlertController, public  restApi : RestapiProvider, public formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.backgroundMode.enable();
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.FrmLogin = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
  ionViewDidLoad() {
    console.log('CreateAccountUserPage');
  }

  async createAdmin() {
    let formData = new FormData();
    formData.append('op', '3');
    formData.append('name', this.FrmLogin.value.name);
    formData.append('lastname', this.FrmLogin.value.lastname);
    formData.append('email', this.FrmLogin.value.email);
    formData.append('password', this.FrmLogin.value.password);
    formData.append('type', '2');
    formData.append('departament', '17');
    await this.restApi.insertLogin(formData).then((data) => {
      this.loginData = data;
      console.log(this.loginData.status);
      if (this.loginData.status === true) {
        console.log("registro exitoso");
        this.navCtrl.setRoot(SeleccionPage);
      } else {
        console.log("registro invalido");
        this.message("Datos Invalidos");
      }
    });
  }

  message(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}

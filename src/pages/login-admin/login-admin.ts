import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackgroundMode} from "@ionic-native/background-mode";
import {RegisterPptPage} from "../register-ppt/register-ppt";
import {RestapiProvider} from "../../providers/restapi/restapi";
import {CreateAccountPage} from "../create-account/create-account";

@Component({
  selector: 'page-login-admin',
  templateUrl: 'login-admin.html',
})
export class LoginAdminPage {
  FrmLogin: FormGroup;
  tabBarElement : any;
  loginData : any;
  data: any;

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode, private alertCtrl: AlertController, public  restApi : RestapiProvider, public formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.backgroundMode.enable();
    this.loginData = JSON.parse(localStorage.getItem('jefeDepartamentoData'));
    if(window.localStorage.getItem('jefeDepartamentoData')){
      console.log("si hay data en localstorage");
      this.loginAuthAdmin(this.loginData);
    } else{
      console.log("no hay data en localstorage");
    }
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.FrmLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
  ionViewDidLoad() {
    console.log('LoginAdminPage');
  }

  async loginAdmin() {
    let formData = new FormData();
    formData.append('op', '1');
    formData.append('email', this.FrmLogin.value.email);
    formData.append('password', this.FrmLogin.value.password);
    await this.restApi.insertLogin(formData).then((data) => {
      this.loginData = data;
      console.log(this.loginData.length);
      if (this.loginData.length != 0) {
        console.log("logeo exitoso");
        localStorage.setItem('jefeDepartamentoData', JSON.stringify(this.loginData));
        this.navCtrl.setRoot(RegisterPptPage);
      } else {
        console.log("legeo invalido");
        this.message("Datos Invalidos");
      }
    });
  }
  async loginAuthAdmin(login) {
    let formData = new FormData();
    formData.append('op', '1');
    formData.append('email', login[0].email);
    formData.append('password', login[0].password);
    await this.restApi.insertLogin(formData).then((data) => {
      this.loginData = data;
      console.log(this.loginData.length);
      if (this.loginData.length != 0) {
        console.log("logeo automatico exitoso");
        this.navCtrl.setRoot(RegisterPptPage);
      } else {
        console.log("logeo automatico invalido");
        this.message("Error Datos Incorrectos");
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
  nextPage(){
    this.navCtrl.push(CreateAccountPage);
  }

}

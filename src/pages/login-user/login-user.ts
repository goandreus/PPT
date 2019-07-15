import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackgroundMode} from "@ionic-native/background-mode";
import {RestapiProvider} from "../../providers/restapi/restapi";
import {ListDepartamentsPage} from "../list-departaments/list-departaments";
import {CreateAccountUserPage} from "../create-account-user/create-account-user";

@Component({
  selector: 'page-login-user',
  templateUrl: 'login-user.html',
})
export class LoginUserPage {
  FrmLoginUser: FormGroup;
  tabBarElement : any;
  loginData : any;
  data: any;

  constructor(public navCtrl: NavController, private backgroundMode: BackgroundMode, private alertCtrl: AlertController, public  restApi : RestapiProvider, public formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.backgroundMode.enable();
    this.loginData = JSON.parse(localStorage.getItem('coronelData'));
    if(window.localStorage.getItem('coronelData')){
      console.log("si hay data en localstorage");
      this.loginAuthUser(this.loginData);
    } else{
      console.log("no hay data en localstorage");
    }
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.FrmLoginUser = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
  ionViewDidLoad() {
    console.log('LoginUserPage');
  }

  async loginUser() {
    let formData = new FormData();
    formData.append('op', '2');
    formData.append('email', this.FrmLoginUser.value.email);
    formData.append('password', this.FrmLoginUser.value.password);
    await this.restApi.insertLogin(formData).then((data) => {
      this.loginData = data;
      console.log(this.loginData.length);
      if (this.loginData.length != 0) {
        console.log("logeo exitoso");
        localStorage.setItem('coronelData', JSON.stringify(this.loginData));
        this.navCtrl.setRoot(ListDepartamentsPage);
      } else {
        console.log("legeo invalido");
        this.message("Datos Invalidos");
      }
    });
  }
  async loginAuthUser(login) {
    let formData = new FormData();
    formData.append('op', '2');
    formData.append('email', login[0].email);
    formData.append('password', login[0].password);
    console.log("kkk"+login[0].email);
    await this.restApi.insertLogin(formData).then((data) => {
      this.loginData = data;
      console.log(this.loginData.length);
      if (this.loginData.length != 0) {
        console.log("logeo automatico exitoso");
        this.navCtrl.setRoot(ListDepartamentsPage);
      } else {
        console.log("logeo automatico invalido");
        this.message("Error Datos Incorrectos");
      }
    });
  }
  nextPage(){
    this.navCtrl.push(CreateAccountUserPage);
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

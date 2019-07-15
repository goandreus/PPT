import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreateAccountPage } from "../pages/create-account/create-account";
import { ListDepartamentsPage } from "../pages/list-departaments/list-departaments";
import { LoginAdminPage } from "../pages/login-admin/login-admin";
import { LoginUserPage } from "../pages/login-user/login-user";
import { RegisterPptPage } from "../pages/register-ppt/register-ppt";
import { SeleccionPage } from "../pages/seleccion/seleccion";
import { ListArchivesPage } from "../pages/list-archives/list-archives";
import { CreateAccountUserPage } from "../pages/create-account-user/create-account-user";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestapiProvider } from '../providers/restapi/restapi';
import { HttpClientModule } from "@angular/common/http";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { BackgroundMode } from "@ionic-native/background-mode";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    ListDepartamentsPage,
    LoginAdminPage,
    LoginUserPage,
    RegisterPptPage,
    SeleccionPage,
    ListArchivesPage,
    CreateAccountUserPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    ListDepartamentsPage,
    LoginAdminPage,
    LoginUserPage,
    RegisterPptPage,
    SeleccionPage,
    ListArchivesPage,
    CreateAccountUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestapiProvider,
    InAppBrowser,
    BackgroundMode
  ]
})
export class AppModule {}

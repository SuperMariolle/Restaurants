import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RestosProvider } from '../providers/restos/restos';
import { DetailPage } from '../pages/detail/detail';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  restos: any;

  //pages: Array<{name: string, mail: string, phone: string, noon_opening:string, evening_opening:string, facebook: string}>;

  constructor(public platform: Platform, public restosService: RestosProvider, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.restosService.getRestaurants().then((data)=>{
      this.restos = data;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  //Récupère les données de la BD

  // je passe d'office la page détails quel que soit le boutton appuyé dans le menu
  openPage(resto) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(DetailPage, {
      resto:resto
    });
  }
}

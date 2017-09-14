import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { RestosProvider } from '../../providers/restos/restos';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //splash = true;
  restos: any;

  constructor(public navCtrl: NavController,  public alertCtrl: AlertController,public restosService: RestosProvider,private splashScreen: SplashScreen ) {
    this.restosService.getRestaurants().then((data)=>{
      this.restos = data;
    });
    this.splashScreen.show();
    
  }

  /*ionViewDidLoad() {
    setTimeout(() => {this.splash = false}, 4000); //remettre 4000
  }*/
}

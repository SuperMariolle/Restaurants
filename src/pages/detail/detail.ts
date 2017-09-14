import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { MenuPage } from '../../pages/menu/menu';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  resto: any;
  image_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private ngZone: NgZone, private iab:InAppBrowser) {
    
    this.resto = navParams.get('resto');
    this.addImageSizeListener();
    
    
  }

  facebook_clicked(){
    const browser = this.iab.create(this.resto.facebook);
  }
  menu_clicked(){
    this.navCtrl.push(MenuPage, 
      {
        menu:this.resto.menu
      });
  }

  addImageSizeListener(){
    window.onresize = (e) =>{
      this.ngZone.run(()=>{
        if(window.innerWidth>=768){
          this.image_url = "../../assets/img/tab_"+this.resto.image_name;
        }else{
          this.image_url = "../../assets/img/"+this.resto.image_name;
        }
      });
    }
    
    if(this.platform.width()>=1024){
      this.image_url = "../../assets/img/tab_"+this.resto.image_name;
    }else{
      this.image_url = "../../assets/img/"+this.resto.image_name;
    }
  }

}

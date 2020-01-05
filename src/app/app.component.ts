import {Component} from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private updates: SwUpdate
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.updates.available.subscribe(() => {
        this.promptUpdate();
      });
    });
  }

  private async promptUpdate() {
    const alert = await this.alertCtrl.create({
      header: 'ポータルのアップデートがあります。今すぐ適用しますか？',
      buttons: [
        {
          text: 'はい',
          handler: () => {
            this.updates.activateUpdate().then(() => document.location.reload());
          }
        },
        'いいえ'
      ]
    });
    alert.present();
  }
}

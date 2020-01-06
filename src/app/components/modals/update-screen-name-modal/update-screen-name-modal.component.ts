import {Component, OnInit} from '@angular/core';
import {JwtPayload} from '../../../models/JwtPayload';
import {AlertController, ModalController} from '@ionic/angular';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-update-screen-name-modal',
  templateUrl: './update-screen-name-modal.component.html',
  styleUrls: ['./update-screen-name-modal.component.scss'],
})
export class UpdateScreenNameModalComponent implements OnInit {
  currentScreenName = '...';
  screenName = '';
  jwtPayload: JwtPayload;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.jwtPayload = this.apiService.decodeMyAccessToken();
    this.apiService.getMember(this.jwtPayload.sub).subscribe(m => this.currentScreenName = m.screenName);
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  updateScreenName(): void {
    this.apiService.updateScreenName(this.jwtPayload.sub, this.screenName)
      .subscribe(() => {
        this.alertCtrl.create({
          header: 'お知らせ',
          subHeader: 'スクリーンネームの変更に成功しました。',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
        this.modalCtrl.dismiss();
      });
  }
}

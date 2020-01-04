import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {ApiService} from '../../../services/api/api.service';
import {JwtPayload} from '../../../models/JwtPayload';

@Component({
  selector: 'app-bio-modal',
  templateUrl: './bio-modal.component.html',
  styleUrls: ['./bio-modal.component.scss'],
})
export class BioModalComponent implements OnInit {
  currentBio = '...';
  bio = '';
  jwtPayload: JwtPayload;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.jwtPayload = this.apiService.decodeMyAccessToken();
    this.apiService.getMember(this.jwtPayload.sub).subscribe(m => this.currentBio = m.bio);
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  updateBio(): void {
    this.apiService.updateBio(this.jwtPayload.sub, this.bio)
      .subscribe(() => {
        this.alertCtrl.create({
          header: 'お知らせ',
          subHeader: '自己紹介の変更に成功しました。',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
        this.modalCtrl.dismiss();
      });
  }

}

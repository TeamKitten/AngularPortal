import {Component, Input} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {ApiService} from '../../../services/api/api.service';
import {Member} from '../../../models/Member';

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.component.html',
  styleUrls: ['./update-password-modal.component.scss'],
})
export class UpdatePasswordModalComponent {
  @Input() member: Member;
  @Input() force = false;
  password = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private apiService: ApiService
  ) {
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  updatePassword(): void {
    this.apiService.updatePassword(this.member.code, this.password)
      .subscribe(() => {
        this.alertCtrl.create({
          header: 'お知らせ',
          subHeader: 'パスワードの変更に成功しました。',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
        this.modalCtrl.dismiss();
      });
  }
}

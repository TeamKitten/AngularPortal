import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {ApiService} from '../../../services/api/api.service';
import {Member} from '../../../models/Member';

@Component({
  selector: 'app-update-role-modal',
  templateUrl: './update-role-modal.component.html',
  styleUrls: ['./update-role-modal.component.scss'],
})
export class UpdateRoleModalComponent implements OnInit {
  @Input() force = false;
  @Input() member: Member;
  currentRole = '...';
  role = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getMember(this.member.code).subscribe(m => this.currentRole = m.role);
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  updateRole(): void {
    this.apiService.updateRole(this.member.code, this.role)
      .subscribe(() => {
        this.alertCtrl.create({
          header: 'お知らせ',
          subHeader: '担当の変更に成功しました。',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
        this.modalCtrl.dismiss({ updated: true });
      });
  }
}

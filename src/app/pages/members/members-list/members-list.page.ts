import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {Member} from '../../../models/Member';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.page.html',
  styleUrls: ['./members-list.page.scss'],
})
export class MembersListPage implements OnInit {
  members: Member[] = [];

  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.apiService.getMembers().subscribe(members => {
      this.members = members;
    }, async err => {
      console.error(err);
      const toast = await this.toastCtrl.create({
        message: 'API呼び出しに失敗しました。',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    });
  }

}

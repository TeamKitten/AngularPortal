import {Component, OnInit} from '@angular/core';
import {AuditLog} from '../../../models/AuditLog';
import {ApiService} from '../../../services/api/api.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  logs: AuditLog[] = [];

  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.presentLoading().then(() =>
      this.checkPermissionAndGetAuditLogs());
  }

  private async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'お待ちください...'
    });
    return loading.present();
  }

  private checkPermissionAndGetAuditLogs() {
    this.apiService.getMember(this.apiService.decodeMyAccessToken().sub).subscribe(async me => {
      if (me.code.split('-')[0] === 'MEM') {
        this.router.navigate(['/']);
        const toast = await this.toastCtrl.create({
          message: 'このページへのアクセス権限がありません。',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        return;
      }
      this.apiService.getAuditLogs().subscribe(logs => {
        this.logs = logs;
        this.loadingCtrl.dismiss();
      });
    });
  }
}

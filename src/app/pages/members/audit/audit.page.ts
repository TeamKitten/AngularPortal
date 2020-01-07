import {Component, OnInit} from '@angular/core';
import {AuditLog} from '../../../models/AuditLog';
import {ApiService} from '../../../services/api/api.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AUDIT_PER_REQUEST_LIMIT} from '../../../constants';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  logs: AuditLog[] = [];
  emptyArrayForSkeleton: number[] = [];
  allFetched = false;
  private currentCursor = AUDIT_PER_REQUEST_LIMIT;

  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private router: Router) {
  }


  ngOnInit() {
    this.emptyArrayForSkeleton = new Array(10).fill(null).map((_, i) => i);
    this.checkPermissionAndGetAuditLogs();
  }

  checkPermissionAndGetAuditLogs(event?: Event) {
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
        this.allFetched = false;
        if (event) {
          (event.target as any).complete();
        }
      });
    });
  }

  addAuditLogs(event: Event) {
    this.apiService.getAuditLogs(this.currentCursor).subscribe(logs => {
      logs.forEach(log => {
        this.logs.push(log);
      });
      (event.target as any).complete();
      if (logs.length) {
        this.currentCursor = this.currentCursor + AUDIT_PER_REQUEST_LIMIT;
      } else {
        this.allFetched = true;
      }
    });
  }
}

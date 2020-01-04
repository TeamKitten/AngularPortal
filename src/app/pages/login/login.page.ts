import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  memberCode = '';
  password = '';
  loading = false;
  initialized = false;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    if (this.storageService.getAccessToken()) {
      this.router.navigate(['/']);
      return;
    }
    this.initialized = true;
  }

  login() {
    this.loading = true;
    this.apiService.authorize(this.memberCode, this.password)
      .subscribe(res => {
        this.storageService.setAccessToken(res.access_token);
        this.router.navigate(['/']);
      }, async () => {
        const toast = await this.toastCtrl.create({
          message: 'ログインに失敗しました。',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        this.loading = false;
        this.password = '';
      });
  }
}



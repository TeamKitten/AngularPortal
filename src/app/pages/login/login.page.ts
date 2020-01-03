import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ToastController} from '@ionic/angular';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';

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
    private authService: AuthService,
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

  login(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.loading = true;
    this.authService.authorize(this.memberCode, this.password)
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



import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ObservableInput} from 'rxjs';
import {AuthResponse} from '../../models/AuthResponse';
import {environment} from '../../../environments/environment';
import {Member} from '../../models/Member';
import {StorageService} from '../storage/storage.service';
import {JwtPayload} from '../../models/JwtPayload';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {catchError} from 'rxjs/operators';
import {AuditLog} from '../../models/AuditLog';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  authorize(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_ENDPOINT}/auth`, {
      username,
      password
    });
  }

  getMembers(): Observable<Member[]> {
    this.confirmJwtExp();
    return this.http.get<Member[]>(`${environment.API_ENDPOINT}/members`, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      }
    }).pipe(catchError(err => {
      throw this.processApiError(err);
    }));
  }

  getMember(code: string): Observable<Member> {
    this.confirmJwtExp();
    return this.http.get<Member>(`${environment.API_ENDPOINT}/members/${code}`, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      }
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  decodeMyAccessToken(): JwtPayload {
    const token = this.storageService.getAccessToken();
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  }

  updateBio(code: string, bio: string): Observable<Member> {
    this.confirmJwtExp();
    return this.http.put<Member>(`${environment.API_ENDPOINT}/members/${code}`, {
      bio
    }, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  updateScreenName(code: string, screenName: string): Observable<Member> {
    this.confirmJwtExp();
    return this.http.put<Member>(`${environment.API_ENDPOINT}/members/${code}`, {
      screenName
    }, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  updateRole(code: string, role: string): Observable<Member> {
    this.confirmJwtExp();
    return this.http.put<Member>(`${environment.API_ENDPOINT}/members/${code}`, {
      role
    }, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  updatePassword(code: string, password: string): Observable<Member> {
    this.confirmJwtExp();
    return this.http.put<Member>(`${environment.API_ENDPOINT}/members/${code}`, {
      password
    }, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  getAuditLogs(offset: number = 0, limit: number = environment.AUDIT_PER_REQUEST_LIMIT): Observable<AuditLog[]> {
    this.confirmJwtExp();
    return this.http.get<AuditLog[]>(`${environment.API_ENDPOINT}/audit`, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
      params: {
        offset: offset.toString(),
        limit: limit.toString()
      }
    }).pipe(catchError(err => {
      throw this.processApiError(err);
    }));
  }

  uploadAvatarImage(code: string, base64: string): Observable<Member> {
    this.confirmJwtExp();
    const data = new FormData();
    data.append('file', this.toBlob(base64));
    return this.http.post<Member>(`${environment.API_ENDPOINT}/members/${code}/avatar`, data, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  uploadCoverImage(code: string, base64: string): Observable<Member> {
    this.confirmJwtExp();
    const data = new FormData();
    data.append('file', this.toBlob(base64));
    return this.http.post<Member>(`${environment.API_ENDPOINT}/members/${code}/cover`, data, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      },
    }).pipe(catchError(err => {
      return this.processApiError(err);
    }));
  }

  private async confirmJwtExp() {
    const jwtPayload = this.decodeMyAccessToken();
    const expDiff = dayjs().diff(dayjs(jwtPayload.exp * 1000));
    if (expDiff >= 0) {
      const alert = await this.alertCtrl.create({
        header: 'エラー',
        subHeader: 'アクセストークンの期限切れです。ログアウトします。',
        buttons: ['OK']
      });
      alert.present();
      this.storageService.removeAccessToken();
      this.router.navigate(['/login']);
    }
  }

  private processApiError(err: ObservableInput<any>): ObservableInput<any> {
    console.error(err);
    this.toastCtrl.create({
      message: 'API呼び出しに失敗しました。',
      duration: 2000,
      color: 'danger'
    }).then(toast => toast.present());
    return err;
  }

  private toBlob(base64: string): Blob | undefined {
    const bin = atob(base64.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try {
      return new Blob([buffer.buffer], {
        type: 'image/png'
      });
    } catch (e) {
      return;
    }
  }
}

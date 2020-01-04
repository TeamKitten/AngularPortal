import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse} from '../../models/AuthResponse';
import {Observable, of} from 'rxjs';
import {Member} from '../../models/Member';
import {leaderFixture} from '../../fixtures/leader';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {StorageService} from '../storage/storage.service';
import jwt from 'jsonwebtoken';
import * as moment from 'moment';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: { post: jasmine.Spy, get: jasmine.Spy, put: jasmine.Spy };
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
  const storageServiceSpy = jasmine.createSpyObj('StorageService', [
    'getAccessToken',
    'removeAccessToken'
  ]);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put'
    ]);
    toastCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));
    const sampleJwtToken = jwt.sign({
      sub: '1234567890',
      name: 'John Doe',
      iat: moment().unix(),
      exp: moment().add(1, 'days').unix()
    }, 'secret');
    storageServiceSpy.getAccessToken.and.returnValue(sampleJwtToken);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ToastController,
          useValue: toastCtrlSpy
        },
        {
          provide: StorageService,
          useValue: storageServiceSpy
        },
        {
          provide: AlertController,
          useValue: alertCtrlSpy
        }
      ]
    });
    service = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authentication successful', () => {
    const expectedResponse: AuthResponse = {
      access_token: 'at'
    };
    httpClientSpy.post.and.returnValue(of(expectedResponse));
    service.authorize('', '').subscribe(resp => expect(resp).toEqual(expectedResponse),
      fail);
  });

  it('should authentication failed', () => {
    const expectedResponse = new HttpErrorResponse({status: 500});
    httpClientSpy.post.and.returnValue(new Observable(observer => {
      observer.error(expectedResponse);
    }));
    service.authorize('', '').subscribe(fail,
      err => expect(err).toEqual(expectedResponse));
  });

  it('should get members successful', () => {
    const expectedResponse: Member[] = [leaderFixture];
    httpClientSpy.get.and.returnValue(of(expectedResponse));
    service.getMembers().subscribe(resp => expect(resp).toEqual(expectedResponse),
      fail);
  });

  it('should get members failed', () => {
    const expectedResponse = new HttpErrorResponse({status: 500});
    httpClientSpy.get.and.returnValue(new Observable(observer => {
      observer.error(expectedResponse);
    }));
    service.getMembers().subscribe(fail,
      err => {
        expect(err).toEqual(expectedResponse);
        expect(toastCtrlSpy.create).toHaveBeenCalledWith({
          message: 'API呼び出しに失敗しました。',
          duration: 2000,
          color: 'danger'
        });
      });
  });

  it('should get member successful', () => {
    httpClientSpy.get.and.returnValue(of(leaderFixture));
    service.getMember('').subscribe(resp => expect(resp).toEqual(leaderFixture),
      fail);
  });

  it('decodeMyAccessToken', () => {
    const jwtPayload = service.decodeMyAccessToken();
    expect(jwtPayload.name).toBe('John Doe');
  });

  it('confirmJwtExp', fakeAsync(() => {
    const sampleJwtToken = jwt.sign({
      sub: '1234567890',
      name: 'John Doe',
      iat: moment().subtract(2, 'days').unix(),
      exp: moment().subtract(1, 'days').unix()
    }, 'secret');
    storageServiceSpy.getAccessToken.and.returnValue(sampleJwtToken);
    const newService = new ApiService(
      httpClientSpy as any,
      storageServiceSpy,
      routerSpy,
      alertCtrlSpy,
      toastCtrlSpy
    );
    (newService as any).confirmJwtExp();
    tick();
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'エラー',
      subHeader: 'アクセストークンの期限切れです。ログアウトします。',
      buttons: ['OK']
    });
    expect(storageServiceSpy.removeAccessToken).toHaveBeenCalledWith();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('updateBio', () => {
    httpClientSpy.put.and.returnValue(of(leaderFixture));
    service.updateBio(leaderFixture.code, 'MUR')
      .subscribe(res => {
        expect(res).toBe(leaderFixture);
      });
  });

  it('processApiError', () => {
    const errObj = new HttpErrorResponse({status: 500});
    const err = (service as any).processApiError(errObj);
    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: 'API呼び出しに失敗しました。',
      duration: 2000,
      color: 'danger'
    });
    expect(err).toEqual(errObj);
  });
});

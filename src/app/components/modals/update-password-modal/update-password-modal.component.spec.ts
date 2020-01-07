import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';

import {UpdatePasswordModalComponent} from './update-password-modal.component';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../services/api/api.service';
import {leaderFixture} from '../../../fixtures/leader';

describe('UpdatePasswordModalComponent', () => {
  let component: UpdatePasswordModalComponent;
  let fixture: ComponentFixture<UpdatePasswordModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'updatePassword',
    'decodeMyAccessToken',
    'getMember'
  ]);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
  const sub = 'LEA-3645969186565158903';
  const password = 'YJSNPI';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub});
    apiServiceSpy.updatePassword.and.callFake(() => of({}));
    apiServiceSpy.getMember.and.callFake(() => of({password}));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));

    TestBed.configureTestingModule({
      declarations: [UpdatePasswordModalComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy
        },
        {
          provide: AlertController,
          useValue: alertCtrlSpy
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordModalComponent);
    component = fixture.componentInstance;
    component.member = leaderFixture;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dismissModal', () => {
    component.dismissModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('updatePassword', () => {
    component.password = password;
    component.updatePassword();
    expect(apiServiceSpy.updatePassword).toHaveBeenCalledWith(sub, password);
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'お知らせ',
      subHeader: 'パスワードの変更に成功しました。',
      buttons: ['OK']
    });
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';

import {UpdateScreenNameModalComponent} from './update-screen-name-modal.component';
import {ApiService} from '../../../services/api/api.service';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';

describe('UpdateScreenNameModalComponent', () => {
  let component: UpdateScreenNameModalComponent;
  let fixture: ComponentFixture<UpdateScreenNameModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'updateScreenName',
    'decodeMyAccessToken',
    'getMember'
  ]);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
  const sub = 'LEA-3645969186565158903';
  const screenName = 'MUR';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub});
    apiServiceSpy.updateScreenName.and.callFake(() => of({}));
    apiServiceSpy.getMember.and.callFake(() => of({screenName}));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));

    TestBed.configureTestingModule({
      declarations: [UpdateScreenNameModalComponent],
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

    fixture = TestBed.createComponent(UpdateScreenNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dismissModal', () => {
    component.dismissModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('updateScreenName', () => {
    component.screenName = screenName;
    component.updateScreenName();
    expect(apiServiceSpy.updateScreenName).toHaveBeenCalledWith(sub, screenName);
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'お知らせ',
      subHeader: 'スクリーンネームの変更に成功しました。',
      buttons: ['OK']
    });
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});

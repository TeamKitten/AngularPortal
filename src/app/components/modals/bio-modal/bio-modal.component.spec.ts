import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';

import {BioModalComponent} from './bio-modal.component';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../services/api/api.service';
import {of} from 'rxjs';

describe('BioModalComponent', () => {
  let component: BioModalComponent;
  let fixture: ComponentFixture<BioModalComponent>;
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'updateBio',
    'decodeMyAccessToken',
    'getMember'
  ]);
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
  const sub = 'LEA-3645969186565158903';
  const bio = 'MUR';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub});
    apiServiceSpy.updateBio.and.callFake(() => of({}));
    apiServiceSpy.getMember.and.callFake(() => of({bio}));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));
    TestBed.configureTestingModule({
      declarations: [BioModalComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: AlertController,
          useValue: alertCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BioModalComponent);
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

  it('updateBio', () => {
    component.bio = bio;
    component.updateBio();
    expect(apiServiceSpy.updateBio).toHaveBeenCalledWith(sub, bio);
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'お知らせ',
      subHeader: '自己紹介の変更に成功しました。',
      buttons: ['OK']
    });
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});

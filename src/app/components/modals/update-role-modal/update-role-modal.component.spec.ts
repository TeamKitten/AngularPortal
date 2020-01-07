import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';

import {UpdateRoleModalComponent} from './update-role-modal.component';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../services/api/api.service';
import {leaderFixture} from '../../../fixtures/leader';

describe('UpdateRoleModalComponent', () => {
  let component: UpdateRoleModalComponent;
  let fixture: ComponentFixture<UpdateRoleModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'updateRole',
    'decodeMyAccessToken',
    'getMember'
  ]);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
  const sub = 'LEA-3645969186565158903';
  const role = 'MUR';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub});
    apiServiceSpy.updateRole.and.callFake(() => of({}));
    apiServiceSpy.getMember.and.callFake(() => of({role}));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));

    TestBed.configureTestingModule({
      declarations: [UpdateRoleModalComponent],
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

    fixture = TestBed.createComponent(UpdateRoleModalComponent);
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
    component.role = role;
    component.updateRole();
    expect(apiServiceSpy.updateRole).toHaveBeenCalledWith(sub, role);
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'お知らせ',
      subHeader: '担当の変更に成功しました。',
      buttons: ['OK']
    });
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});

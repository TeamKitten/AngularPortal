import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';

import {UploadAvatarModalComponent} from './upload-avatar-modal.component';
import {of} from 'rxjs';
import {ApiService} from '../../../services/api/api.service';
import {leaderFixture} from '../../../fixtures/leader';
import {ImageCropperModule} from 'ngx-image-cropper';

describe('UploadAvatarModalComponent', () => {
  let component: UploadAvatarModalComponent;
  let fixture: ComponentFixture<UploadAvatarModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'uploadAvatarImage',
    'decodeMyAccessToken'
  ]);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
  const sub = 'LEA-3645969186565158903';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub});
    apiServiceSpy.uploadAvatarImage.and.callFake(() => of(leaderFixture));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));

    TestBed.configureTestingModule({
      declarations: [UploadAvatarModalComponent],
      imports: [IonicModule.forRoot(), ImageCropperModule],
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

    fixture = TestBed.createComponent(UploadAvatarModalComponent);
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

  it('uploadAvatar', () => {
    component.croppedImage = 'base64';
    component.uploadAvatar();
    expect(apiServiceSpy.uploadAvatarImage).toHaveBeenCalledWith(sub, 'base64');
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'お知らせ',
      subHeader: 'アバターの変更に成功しました。',
      buttons: ['OK']
    });
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('imageCropped', () => {
    component.imageCropped({base64: 'base64'} as any);
    expect(component.croppedImage).toBe('base64');
  });

  it('selectFileClick', () => {
    component.fileInput = {
      nativeElement: {
        click: jasmine.createSpy()
      } as any
    };
    component.selectFileClick();
    expect(component.fileInput.nativeElement.click).toHaveBeenCalled();
  });
});

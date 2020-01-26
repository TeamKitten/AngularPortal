import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';

import { UploadCoverImageModalComponent } from './upload-cover-image-modal.component';
import {of} from 'rxjs';
import {leaderFixture} from '../../../fixtures/leader';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ApiService} from '../../../services/api/api.service';

describe('UploadCoverImageModalComponent', () => {
  let component: UploadCoverImageModalComponent;
  let fixture: ComponentFixture<UploadCoverImageModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'uploadCoverImage',
    'decodeMyAccessToken'
  ]);
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
  const sub = 'LEA-3645969186565158903';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub});
    apiServiceSpy.uploadCoverImage.and.callFake(() => of(leaderFixture));
    alertCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));

    TestBed.configureTestingModule({
      declarations: [UploadCoverImageModalComponent],
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

    fixture = TestBed.createComponent(UploadCoverImageModalComponent);
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

  it('uploadCoverImage', () => {
    component.croppedImage = 'base64';
    component.uploadCoverImage();
    expect(apiServiceSpy.uploadCoverImage).toHaveBeenCalledWith(sub, 'base64');
    expect(alertCtrlSpy.create).toHaveBeenCalledWith({
      header: 'お知らせ',
      subHeader: 'カバー画像の変更に成功しました。',
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

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtPayload} from '../../../models/JwtPayload';
import {AlertController, ModalController} from '@ionic/angular';
import {ApiService} from '../../../services/api/api.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-upload-avatar-modal',
  templateUrl: './upload-avatar-modal.component.html',
  styleUrls: ['./upload-avatar-modal.component.scss']
})
export class UploadAvatarModalComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef<HTMLInputElement>;

  jwtPayload: JwtPayload;
  imageChangedEvent: Event;
  cropperWrapperStyle = {};
  croppedImage: string;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit(): void {
    this.jwtPayload = this.apiService.decodeMyAccessToken();
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  selectFileClick(): void {
    this.fileInput.nativeElement.click();
  }

  uploadAvatar(): void {
    this.apiService.uploadAvatarImage(this.jwtPayload.sub, this.croppedImage)
      .subscribe(() => {
        this.alertCtrl.create({
          header: 'お知らせ',
          subHeader: 'アバターの変更に成功しました。',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
        this.modalCtrl.dismiss();
      });
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    const eventTarget = event.target as EventTarget & { files: FileList };
    const image = new Image();
    const reader = new FileReader();
    reader.onloadend = () => {
      image.src = reader.result as string;
      image.onload = () => {
        this.cropperWrapperStyle = {
          maxWidth: `${image.naturalWidth}px`,
          maxHeight: `${image.naturalHeight}px`
        };
      };
    };
    reader.readAsDataURL(eventTarget.files[0]);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}

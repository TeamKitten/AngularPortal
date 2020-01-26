import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadAvatarModalComponent} from './upload-avatar-modal.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [UploadAvatarModalComponent],
  exports: [UploadAvatarModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ImageCropperModule
  ]
})
export class UploadAvatarModalModule {
}

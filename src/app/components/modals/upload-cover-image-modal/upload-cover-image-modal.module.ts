import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadCoverImageModalComponent} from './upload-cover-image-modal.component';
import {IonicModule} from '@ionic/angular';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [UploadCoverImageModalComponent],
  exports: [UploadCoverImageModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ImageCropperModule
  ]
})
export class UploadCoverImageModalModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {YouPageRoutingModule} from './you-routing.module';

import {YouPage} from './you.page';
import {ApiService} from '../../../services/api/api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    YouPageRoutingModule,
    HttpClientModule
  ],
  declarations: [YouPage],
  providers: [ApiService]
})
export class YouPageModule {
}

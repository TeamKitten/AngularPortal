import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {YouPageRoutingModule} from './you-routing.module';

import {YouPage} from './you.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    YouPageRoutingModule
  ],
  declarations: [YouPage]
})
export class YouPageModule {
}

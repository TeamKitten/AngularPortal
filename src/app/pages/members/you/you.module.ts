import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YouPageRoutingModule } from './you-routing.module';

import { YouPage } from './you.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YouPageRoutingModule
  ],
  declarations: [YouPage]
})
export class YouPageModule {}

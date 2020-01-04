import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {MembersPageRoutingModule} from './members-routing.module';

import {MembersPage} from './members.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MembersPageRoutingModule
  ],
  declarations: [MembersPage]
})
export class MembersPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {MembersPageRoutingModule} from './members-routing.module';

import {MembersPage} from './members.page';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../../services/api/api.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MembersPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MembersPage],
  providers: [ApiService]
})
export class MembersPageModule {
}

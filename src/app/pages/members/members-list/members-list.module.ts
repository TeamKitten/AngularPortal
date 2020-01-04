import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MembersListPageRoutingModule} from './members-list-routing.module';

import {MembersListPage} from './members-list.page';
import {ApiService} from '../../../services/api/api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersListPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MembersListPage],
  providers: [ApiService]
})
export class MembersListPageModule {
}

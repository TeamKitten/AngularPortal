import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {ApiService} from '../../../services/api/api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    HttpClientModule
  ],
  declarations: [HomePage],
  providers: [ApiService]
})
export class HomePageModule {
}

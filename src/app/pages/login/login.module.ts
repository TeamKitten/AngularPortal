import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../../services/api/api.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [LoginPage],
  providers: [ApiService]
})
export class LoginPageModule {
}

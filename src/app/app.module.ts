import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BioModalComponent} from './components/modals/bio-modal/bio-modal.component';
import {FormsModule} from '@angular/forms';
import {MemberInfoModalComponent} from './components/modals/member-info-modal/member-info-modal.component';
import {UpdateScreenNameModalComponent} from './components/modals/update-screen-name-modal/update-screen-name-modal.component';
import {UpdatePasswordModalComponent} from './components/modals/update-password-modal/update-password-modal.component';
import {UpdateRoleModalComponent} from './components/modals/update-role-modal/update-role-modal.component';
import {UploadAvatarModalComponent} from './components/modals/upload-avatar-modal/upload-avatar-modal.component';
import {UploadAvatarModalModule} from './components/modals/upload-avatar-modal/upload-avatar-modal.module';
import {UploadCoverImageModalComponent} from './components/modals/upload-cover-image-modal/upload-cover-image-modal.component';
import {UploadCoverImageModalModule} from './components/modals/upload-cover-image-modal/upload-cover-image-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    BioModalComponent,
    MemberInfoModalComponent,
    UpdateScreenNameModalComponent,
    UpdatePasswordModalComponent,
    UpdateRoleModalComponent
  ],
  entryComponents: [
    BioModalComponent,
    MemberInfoModalComponent,
    UpdateScreenNameModalComponent,
    UpdatePasswordModalComponent,
    UpdateRoleModalComponent,
    UploadAvatarModalComponent,
    UploadCoverImageModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    UploadAvatarModalModule,
    UploadCoverImageModalModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

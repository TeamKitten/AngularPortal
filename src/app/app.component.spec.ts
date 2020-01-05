import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {SwUpdate} from '@angular/service-worker';
import {Subject} from 'rxjs';

class MockSwUpdate {
  $$availableSubj = new Subject<{ available: { hash: string } }>();
  $$activatedSubj = new Subject<{ current: { hash: string } }>();

  available = this.$$availableSubj.asObservable();
  activated = this.$$activatedSubj.asObservable();

  activateUpdate = jasmine.createSpy('MockSwUpdate.activateUpdate')
    .and.callFake(() => Promise.resolve());

  checkForUpdate = jasmine.createSpy('MockSwUpdate.checkForUpdate')
    .and.callFake(() => Promise.resolve());

  constructor(public isEnabled: boolean) {
  }
}

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let swu: MockSwUpdate;
  const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});
    swu = new MockSwUpdate(true);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: StatusBar, useValue: statusBarSpy},
        {provide: SplashScreen, useValue: splashScreenSpy},
        {provide: Platform, useValue: platformSpy},
        {provide: SwUpdate, useValue: swu},
        {provide: AlertController, useValue: alertCtrlSpy}
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
    spyOn(app as any, 'promptUpdate').and.callThrough();
    swu.$$availableSubj.next({available: {hash: 'foo'}});
    expect((app as any).promptUpdate).toHaveBeenCalled();
  });

  it('promptUpdate', () => {
    (app as any).promptUpdate();
    expect(alertCtrlSpy.create).toHaveBeenCalled();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AuditPage} from './audit.page';
import {ApiService} from '../../../services/api/api.service';
import {of} from 'rxjs';
import {leaderFixture} from '../../../fixtures/leader';
import {Router} from '@angular/router';

describe('AuditPage', () => {
  let component: AuditPage;
  let fixture: ComponentFixture<AuditPage>;
  const loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['create', 'dismiss']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'getMember',
    'decodeMyAccessToken',
    'getAuditLogs'
  ]);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    apiServiceSpy.getMember.and.callFake(() => of(leaderFixture));
    apiServiceSpy.decodeMyAccessToken.and.callFake(() => leaderFixture.code);
    apiServiceSpy.getAuditLogs.and.callFake(() => of([]));
    TestBed.configureTestingModule({
      declarations: [AuditPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

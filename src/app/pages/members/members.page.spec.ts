import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, MenuController} from '@ionic/angular';

import {MembersPage} from './members.page';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterEvent} from '@angular/router';
import {of, ReplaySubject} from 'rxjs';
import {leaderFixture} from '../../fixtures/leader';
import {ApiService} from '../../services/api/api.service';

describe('MembersPage', () => {
  let component: MembersPage;
  let fixture: ComponentFixture<MembersPage>;
  const menuCtrl = jasmine.createSpyObj<MenuController>(
    'MenuController',
    ['close']
  );
  const eventSubject = new ReplaySubject<RouterEvent>(1);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['decodeMyAccessToken', 'getMember']);

  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable()
  };

  beforeEach(async(() => {
    apiServiceSpy.getMember.and.callFake(() => of(leaderFixture));
    apiServiceSpy.decodeMyAccessToken.and.callFake(() => leaderFixture.code);
    TestBed.configureTestingModule({
      declarations: [MembersPage],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: MenuController,
          useValue: menuCtrl
        },
        {
          provide: ApiService,
          useValue: apiServiceSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate should work', () => {
    component.navigate('/');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(menuCtrl.close).toHaveBeenCalled();
  });
});

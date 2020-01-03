import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {ApiService} from '../../../services/api/api.service';
import {Member} from '../../../models/Member';
import {of} from 'rxjs';
import {leaderFixture} from '../../../fixtures/leader';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiServiceMock: Partial<ApiService>;
  let members: Member[] = [];

  beforeEach(async(() => {
    apiServiceMock = {
      getMembers: () => of(members)
    };
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized with valid members count', () => {
    members = [
      leaderFixture
    ];
    component.initializeMembersCount();
    expect(component.membersCount).toBe(1);
  });
});

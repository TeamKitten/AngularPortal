import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, ModalController} from '@ionic/angular';

import {MembersListPage} from './members-list.page';
import {ApiService} from '../../../services/api/api.service';
import {of} from 'rxjs';
import {leaderFixture} from '../../../fixtures/leader';

describe('MembersListPage', () => {
  let component: MembersListPage;
  let fixture: ComponentFixture<MembersListPage>;
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getMembers']);
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

  beforeEach(async(() => {
    apiServiceSpy.getMembers.and.callFake(() => of([leaderFixture]));
    modalCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));
    TestBed.configureTestingModule({
      declarations: [MembersListPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MembersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized members array', () => {
    component.ngOnInit();
    expect(component.members.length).toBe(1);
  });

  it('openMemberInfoModal', () => {
    component.openMemberInfoModal(leaderFixture);
    expect(modalCtrlSpy.create).toHaveBeenCalled();
  });

  it('getMembers', () => {
    (component as any).getMembers();
    expect(apiServiceSpy.getMembers).toHaveBeenCalled();
    expect(component.members).toEqual([leaderFixture]);
  });
});

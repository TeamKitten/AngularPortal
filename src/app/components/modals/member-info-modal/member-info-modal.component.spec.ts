import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, ModalController} from '@ionic/angular';

import {MemberInfoModalComponent} from './member-info-modal.component';
import {ApiService} from '../../../services/api/api.service';
import {alternativeExecutiveFixture, executiveFixture, leaderFixture} from '../../../fixtures/leader';

describe('MemberInfoModalComponent', () => {
  let component: MemberInfoModalComponent;
  let fixture: ComponentFixture<MemberInfoModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss', 'create']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['decodeMyAccessToken']);
  const excSub = 'EXC-31415926535897932384626433832795028841971';

  beforeEach(async(() => {
    apiServiceSpy.decodeMyAccessToken.and.returnValue({sub: excSub});
    modalCtrlSpy.create.and.callFake(() => ({present: () => Promise.resolve()}));
    TestBed.configureTestingModule({
      declarations: [MemberInfoModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: ApiService,
          useValue: apiServiceSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberInfoModalComponent);
    component = fixture.componentInstance;
    component.member = leaderFixture;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dismissModal', () => {
    component.dismissModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  describe('initializeShowAdminMenu', () => {
    it('when target is LEA and own privilege is EXC', () => {
      (component as any).initializeShowAdminMenu();
      expect(component.showAdminMenu).toBeFalsy();
    });
    it('when target is myself', () => {
      component.member = executiveFixture;
      fixture.detectChanges();
      (component as any).initializeShowAdminMenu();
      expect(component.showAdminMenu).toBeFalsy();
    });
    it('when target is EXC and myself is different EXC member', () => {
      component.member = alternativeExecutiveFixture;
      fixture.detectChanges();
      (component as any).initializeShowAdminMenu();
      expect(component.showAdminMenu).toBeTruthy();
    });
  });

  it('updatePasswordModal', () => {
    component.updatePasswordModal();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
  });

  it('updateRoleModal', () => {
    component.updateRoleModal();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
  });
});

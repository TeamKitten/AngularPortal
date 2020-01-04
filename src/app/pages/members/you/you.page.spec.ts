import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, ModalController} from '@ionic/angular';

import {YouPage} from './you.page';

describe('YouPage', () => {
  let component: YouPage;
  let fixture: ComponentFixture<YouPage>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

  beforeEach(async(() => {
    modalCtrlSpy.create.and.callFake(() => Promise.resolve({
      present: () => Promise.resolve()
    }));
    TestBed.configureTestingModule({
      declarations: [YouPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(YouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openChangeBioModal', () => {
    component.openChangeBioModal();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
  });
});

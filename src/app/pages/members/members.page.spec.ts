import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MembersPage} from './members.page';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('MembersPage', () => {
  let component: MembersPage;
  let fixture: ComponentFixture<MembersPage>;
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersPage],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: router
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
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

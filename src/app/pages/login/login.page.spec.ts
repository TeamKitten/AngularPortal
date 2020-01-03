import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, ToastController} from '@ionic/angular';

import {LoginPage} from './login.page';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../models/AuthResponse';
import {HttpErrorResponse} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage/storage.service';
import {ApiService} from '../../services/api/api.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let apiServiceMock: Partial<ApiService>;
  const router = jasmine.createSpyObj('router', ['navigate']);
  const storageServiceSpy = jasmine.createSpyObj(
    'StorageService',
    ['setAccessToken', 'getAccessToken']
  );
  const toastCtrlSpy = jasmine.createSpyObj(
    'ToastController',
    ['create']
  );

  beforeEach(async(() => {
    apiServiceMock = {
      authorize: (username: string, password: string) => {
        return new Observable<AuthResponse>(observer => {
          if (username === 'hoge' && password === 'fuga') {
            return observer.next({
              access_token: 'at'
            });
          }
          observer.error(new HttpErrorResponse({
            status: 401
          }));
        });
      }
    };
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceMock
        },
        {
          provide: Router,
          useValue: router
        },
        {
          provide: StorageService,
          useValue: storageServiceSpy
        },
        {
          provide: ToastController,
          useValue: toastCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('if already stored access token' , () => {
    storageServiceSpy.getAccessToken.and.returnValue(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
  */

  it('login should success', () => {
    component.memberCode = 'hoge';
    component.password = 'fuga';
    fixture.detectChanges();
    component.login();
    expect(storageServiceSpy.setAccessToken)
      .toHaveBeenCalledWith('at');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('login should failed', () => {
    component.memberCode = 'hoge';
    component.password = 'foo';
    fixture.detectChanges();
    component.login();
    toastCtrlSpy.create.and.returnValue({present: () => undefined});
    expect(toastCtrlSpy.create).toHaveBeenCalled();
  });
});

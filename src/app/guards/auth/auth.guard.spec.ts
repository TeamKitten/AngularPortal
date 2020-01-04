import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

describe('AuthGuard', () => {
  let accessToken: string | null = null;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthGuard,
        {
          provide: StorageService,
          useValue: {getAccessToken: () => accessToken},
        },
        {
          provide: Router,
          useValue: routerSpy,
        }
      ],
    });
  });

  it('should be passed', inject([AuthGuard], (guard: AuthGuard) => {
    accessToken = 'at';
    expect(guard.canActivate()).toBeTruthy();
  }));

  it('should not be passed', inject([AuthGuard], (guard: AuthGuard) => {
    accessToken = null;
    expect(guard.canActivate()).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});

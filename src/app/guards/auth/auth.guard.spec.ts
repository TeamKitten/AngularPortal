import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  let accessToken: string | null = null;
  const router = jasmine.createSpyObj('router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: StorageService,
          useValue: {getAccessToken: () => accessToken},
        },
        {
          provide: Router,
          useValue: router,
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
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});

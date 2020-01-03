import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse} from '../../models/AuthResponse';
import {Observable, of} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authentication successful', () => {
    const expectedResponse: AuthResponse = {
      access_token: 'at'
    };
    httpClientSpy.post.and.returnValue(of(expectedResponse));
    service.authorize('', '').subscribe(resp => expect(resp).toEqual(expectedResponse),
      fail);
  });

  it('should authentication failed', () => {
    const expectedResponse = new HttpErrorResponse({status: 500});
    httpClientSpy.post.and.returnValue(new Observable(observer => {
      observer.error(expectedResponse);
    }));
    service.authorize('', '').subscribe(fail,
      err => expect(err).toEqual(expectedResponse));
  });
});

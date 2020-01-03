import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse} from '../../models/AuthResponse';
import {Observable, of} from 'rxjs';
import {Member} from '../../models/Member';
import {leaderFixture} from '../../fixtures/leader';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: { post: jasmine.Spy, get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.get(ApiService);
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

  it('should get members successful', () => {
    const expectedResponse: Member[] = [leaderFixture];
    httpClientSpy.get.and.returnValue(of(expectedResponse));
    service.getMembers().subscribe(resp => expect(resp).toEqual(expectedResponse),
      fail);
  });

  it('should get members failed', () => {
    const expectedResponse = new HttpErrorResponse({status: 500});
    httpClientSpy.get.and.returnValue(new Observable(observer => {
      observer.error(expectedResponse);
    }));
    service.getMembers().subscribe(fail,
      err => expect(err).toEqual(expectedResponse));
  });
});

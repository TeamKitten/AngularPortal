import {TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {ACCESS_TOKEN_KEY} from '../../constants';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(StorageService);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAccessToken', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'at');
    expect(service.getAccessToken()).toBe('at');
  });

  it('settAccessToken', () => {
    service.setAccessToken('at');
    expect(service.getAccessToken()).toBe('at');
  });
});

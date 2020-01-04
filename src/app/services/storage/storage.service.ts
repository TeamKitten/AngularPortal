import {Injectable} from '@angular/core';
import {ACCESS_TOKEN_KEY} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

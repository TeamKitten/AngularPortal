import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  setAccessToken(token: string): void {
    localStorage.setItem(environment.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(environment.ACCESS_TOKEN_KEY);
  }

  removeAccessToken(): void {
    localStorage.removeItem(environment.ACCESS_TOKEN_KEY);
  }
}

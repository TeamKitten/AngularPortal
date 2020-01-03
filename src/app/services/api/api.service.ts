import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../models/AuthResponse';
import {API_ENDPOINT} from '../../constants';
import {Member} from '../../models/Member';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
  }

  authorize(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_ENDPOINT}/auth`, {
      username,
      password
    });
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${API_ENDPOINT}/members`, {
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`
      }
    });
  }
}

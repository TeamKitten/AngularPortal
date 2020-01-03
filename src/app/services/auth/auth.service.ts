import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../models/AuthResponse';
import {HttpClient} from '@angular/common/http';
import {API_ENDPOINT} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {
  }

  authorize(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_ENDPOINT}/auth`, {
      username,
      password
    });
  }
}

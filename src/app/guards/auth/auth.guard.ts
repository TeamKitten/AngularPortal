import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StorageService} from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {
  }

  canActivate(): boolean {
    if (!this.storageService.getAccessToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

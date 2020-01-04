import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage {
  constructor(private router: Router) {
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}

import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  currentTitle = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {
  }

  ngOnInit(): void {
    this.initializeCurrentTitle();
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.menuCtrl.close();
  }

  public initializeCurrentTitle(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        switch (e.url) {
          case '/':
            this.currentTitle = 'ダッシュボード';
            break;
          case '/you':
            this.currentTitle = 'あなた';
            break;
          case '/members':
            this.currentTitle = 'メンバー';
            break;
          default:
            return '';
        }
      }
    });
  }
}

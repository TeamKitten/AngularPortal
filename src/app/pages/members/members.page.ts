import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  currentTitle = '';
  isExecutive = false;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getMember(this.apiService.decodeMyAccessToken().sub).subscribe(me =>
      this.isExecutive = me.code.split('-')[0] !== 'MEM');
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
          case '/audit':
            this.currentTitle = '監査';
            break;
          default:
            return '';
        }
      }
    });
  }
}

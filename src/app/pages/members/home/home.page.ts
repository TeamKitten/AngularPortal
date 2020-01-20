import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  membersCount: number;
  teamAge: number;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.initializeMembersCount();
    this.initializeTeamAge();
  }

  initializeMembersCount(): void {
    this.apiService.getMembers().subscribe(members => {
      this.membersCount = members.length;
    });
  }

  initializeTeamAge() {
    const origin = dayjs()
      .set('year', 2018)
      .set('month', 0)
      .set('date', 30);
    const now = dayjs();
    this.teamAge = now.diff(origin, 'day');
  }
}

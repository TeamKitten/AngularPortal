import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import * as moment from 'moment';

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
    const origin = moment()
      .set('year', 2018)
      .set('months', 0)
      .set('dates', 30);
    const now = moment();
    this.teamAge = now.diff(origin, 'days');
  }
}

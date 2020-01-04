import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {Member} from '../../../models/Member';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.page.html',
  styleUrls: ['./members-list.page.scss'],
})
export class MembersListPage implements OnInit {
  members: Member[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}

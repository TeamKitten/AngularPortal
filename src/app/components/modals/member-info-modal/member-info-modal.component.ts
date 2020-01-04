import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Member} from '../../../models/Member';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-member-info-modal',
  templateUrl: './member-info-modal.component.html',
  styleUrls: ['./member-info-modal.component.scss'],
})
export class MemberInfoModalComponent implements OnInit {
  @Input() member: Member;
  showAdminMenu = false;
  privilege: string;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.initializeShowAdminMenu();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  private initializeShowAdminMenu() {
    const jwtPayload = this.apiService.decodeMyAccessToken();
    const split = jwtPayload.sub.split('-');
    const myPrivilege = split[0];
    this.privilege = myPrivilege;
    if (myPrivilege === 'EXC' && this.member.code.split('-')[0] === 'LEA') {
      this.showAdminMenu = false;
      return;
    }
    if (myPrivilege === 'LEA' || myPrivilege === 'EXC') {
      this.showAdminMenu = this.member.code !== jwtPayload.sub;
    }
  }
}

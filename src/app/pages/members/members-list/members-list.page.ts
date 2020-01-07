import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {Member} from '../../../models/Member';
import {ModalController} from '@ionic/angular';
import {MemberInfoModalComponent} from '../../../components/modals/member-info-modal/member-info-modal.component';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.page.html',
  styleUrls: ['./members-list.page.scss'],
})
export class MembersListPage implements OnInit {
  members: Member[] = [];
  emptyArrayForSkeleton: number[] = [];

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.emptyArrayForSkeleton = new Array(10).fill(null).map((_, i) => i);
    this.getMembers();
  }

  async openMemberInfoModal(member: Member) {
    const modal = await this.modalCtrl.create({
      component: MemberInfoModalComponent,
      componentProps: {
        member
      }
    });
    modal.present();
  }

  private getMembers() {
    this.apiService.getMembers().subscribe(members => {
      this.members = members;
    });
  }
}

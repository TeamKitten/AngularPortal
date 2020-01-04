import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BioModalComponent} from '../../../components/modals/bio-modal/bio-modal.component';

@Component({
  selector: 'app-you',
  templateUrl: './you.page.html',
  styleUrls: ['./you.page.scss'],
})
export class YouPage {

  constructor(private modalCtrl: ModalController) {
  }

  async openChangeBioModal() {
    const modal = await this.modalCtrl.create({
      component: BioModalComponent
    });
    return await modal.present();
  }

}

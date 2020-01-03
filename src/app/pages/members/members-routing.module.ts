import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersPageRoutingModule {}

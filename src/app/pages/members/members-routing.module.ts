import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MembersPage} from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'you',
        loadChildren: () => import('./you/you.module').then(m => m.YouPageModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./members-list/members-list.module').then(m => m.MembersListPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersPageRoutingModule {
}

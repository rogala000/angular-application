import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignsDetailComponent } from './campaigns-detail/campaigns-detail.component';
import { CampaignsAddComponent } from './campaigns-add/campaigns-add.component';
import { CampaignsEditComponent } from './campaigns-edit/campaigns-edit.component';

const routes: Routes = [
  {
    path: 'campaigns',
    component: CampaignsComponent,
    data: { title: 'List of campaigns' }
  },
  {
    path: 'campaigns-detail/:id',
    component: CampaignsDetailComponent,
    data: { title: 'Campaign details' }
  },
  {
    path: 'campaigns-add',
    component: CampaignsAddComponent,
    data: { title: 'Add campaign' }
  },
  {
    path: 'campaigns-edit/:id',
    component: CampaignsEditComponent,
    data: { title: 'Edit campaign' }
  },
  { path: '',
    redirectTo: '/campaigns',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

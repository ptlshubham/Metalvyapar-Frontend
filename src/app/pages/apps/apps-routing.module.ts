import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ReademailComponent } from './reademail/reademail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GrievanceInboxComponent } from './grievance-inbox/grievance-inbox.component';
import { GrievanceReadmailComponent } from './grievance-readmail/grievance-readmail.component';

const routes: Routes = [
  
 
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'read/:id',
    component: ReademailComponent
  },
  {
    path: 'grievance-inbox',
    component: GrievanceInboxComponent
  },
  {
    path: 'grivance-read/:id',
    component: GrievanceReadmailComponent
  },
  {
    path: 'invoice-list',
    component: InvoiceListComponent
  },
  {
    path: 'invoice-detail',
    component: InvoiceDetailComponent
  },
  
  {
    path: 'profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppsRoutingModule } from './apps-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { InboxComponent } from './inbox/inbox.component';
import { ReademailComponent } from './reademail/reademail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceListSortableDirective } from './invoice-list/Invoice-sortable.directive';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GrievanceInboxComponent } from './grievance-inbox/grievance-inbox.component';
import { GrievanceReadmailComponent } from './grievance-readmail/grievance-readmail.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageViewerModule } from 'ngx-image-viewer';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    InboxComponent,
    ReademailComponent,
    InvoiceListComponent,
    InvoiceListSortableDirective,
    InvoiceDetailComponent,
    UserProfileComponent,
    GrievanceInboxComponent,
    GrievanceReadmailComponent
  ],
  imports: [
    ImageViewerModule.forRoot(),
    CommonModule,
    SharedModule,
    AppsRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbPaginationModule,
    NgSelectModule,
    SimplebarAngularModule,
    CKEditorModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgbTooltipModule,

  ]
})
export class AppsModule { }

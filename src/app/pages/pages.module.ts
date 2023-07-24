import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountToModule } from 'angular-count-to';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { AppsModule } from './apps/apps.module';

import { TablesModule } from './tables/tables.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpcomingDeliveriesComponent } from './upcoming-deliveries/upcoming-deliveries.component';
import { UpcomingPaymentsComponent } from './upcoming-payments/upcoming-payments.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ImageViewerModule } from "ngx-image-viewer";

@NgModule({
  declarations: [
    DashboardComponent,
    UpcomingDeliveriesComponent,
    UpcomingPaymentsComponent,
    ImageViewerComponent
  ],
  imports: [
    ImageViewerModule.forRoot(),
    CommonModule,
    WidgetModule,
    NgbModule,
    FormsModule,
    CountToModule,
    ReactiveFormsModule,
    SharedModule,
    NgApexchartsModule,
    ArchwizardModule,
    NgSelectModule,
    PagesRoutingModule,
    SimplebarAngularModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    AppsModule,
    LightboxModule,
    TablesModule,
    LeafletModule,
    NgbDatepickerModule,
    FlatpickrModule.forRoot(),
  ],
  providers:[
    DatePipe
  ]
})
export class PagesModule { }

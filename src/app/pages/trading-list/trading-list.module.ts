import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SellerListComponent } from './seller-list/seller-list.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TradeListRoutingModule } from './trade-list-routing';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { dataTableSortableDirective } from '../tables/datatable/datatable-sortable.directive';
import { TablesModule } from '../tables/tables.module';
import { CustomerTradeSummaryComponent } from './customer-trade-summary/customer-trade-summary.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CommissionListComponent } from './commission-list/commission-list.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatatableComponent } from '../tables/datatable/datatable.component';
import { PendingKycComponent } from './pending-kyc/pending-kyc.component';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { OrderInitiativeComponent } from './order-initiative/order-initiative.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { MasterTableComponent } from './master-table/master-table.component';
import { TopBuyerListComponent } from './top-buyer-list/top-buyer-list.component';
import { TopQualityListComponent } from './top-quality-list/top-quality-list.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';




@NgModule({
  declarations: [
    SellerListComponent,
    BuyerListComponent,
    CustomerListComponent,
    CustomerTradeSummaryComponent,
    CustomerDetailsComponent,
    CommissionListComponent,
    PendingKycComponent,
    ContactUsListComponent,
    OrderInitiativeComponent,
    MasterTableComponent,
    TopBuyerListComponent,
    TopQualityListComponent,
    SubscriptionListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    TradeListRoutingModule,
    NgSelectModule,
    ImageViewerModule.forRoot(),
    NgbModule,
    SimplebarAngularModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    TablesModule,
    DropzoneModule,
    CountToModule,
    ArchwizardModule,
    NgbNavModule,
    FeatherModule.pick(allIcons),
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    FlatpickrModule.forRoot(),
  ],
  providers:[
    CustomerDetailsComponent,
    dataTableSortableDirective,
    DatatableComponent,
    DatePipe
  ]
})
export class TradingListModule { }

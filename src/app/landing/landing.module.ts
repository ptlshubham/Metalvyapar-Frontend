import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { ExtrapagesModule } from '../extrapages/extrapages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from '../layouts/layouts.module';
import { CountToModule } from 'angular-count-to';
import { SharedModule } from '../shared/shared.module';
import { TradeComponent } from './trade/trade.component';
import { TradeSummaryComponent } from './trade-summary/trade-summary.component';
import { TradePaymentComponent } from './trade-payment/trade-payment.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SellerTradeComponent } from './seller-trade/seller-trade.component';
import { SellerTradeSummaryComponent } from './seller-trade-summary/seller-trade-summary.component';
import { SellerTradePaymentComponent } from './seller-trade-payment/seller-trade-payment.component';
import { CustomerPaymentComponent } from './customer-payment/customer-payment.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { ArchwizardModule } from 'angular-archwizard';
import { TradeSummaryDetailsComponent } from './trade-summary-details/trade-summary-details.component';
import { SellerTradeSummaryDetailsComponent } from './seller-trade-summary-details/seller-trade-summary-details.component';
import { SellerTradePaymentDetailsComponent } from './seller-trade-payment-details/seller-trade-payment-details.component';
import { TradePaymentDetailsComponent } from './trade-payment-details/trade-payment-details.component';
import { SubscripitionComponent } from './subscripition/subscripition.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TablesModule } from '../pages/tables/tables.module';
import { SellerDispachComponent } from './seller-dispach/seller-dispach.component';
import { SellerPaymentsComponent } from './seller-payments/seller-payments.component';
import { BuyerPaymentsComponent } from './buyer-payments/buyer-payments.component';
import { BuyerDeliveriesComponent } from './buyer-deliveries/buyer-deliveries.component';
import { BuyerCompletedTradeComponent } from './buyer-completed-trade/buyer-completed-trade.component';
import { SellerCompletedTradeComponent } from './seller-completed-trade/seller-completed-trade.component';
import { SupportComponent } from './support/support.component';
import { AgmCoreModule } from '@agm/core';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ImageViewerModule } from "ngx-image-viewer";

@NgModule({
  declarations: [
    HomeComponent,
    TradeComponent,
    TradeSummaryComponent,
    TradePaymentComponent,
    SellerTradeComponent,
    SellerTradeSummaryComponent,
    SellerTradePaymentComponent,
    CustomerPaymentComponent,
    CompleteProfileComponent,
    TradeSummaryDetailsComponent,
    SellerTradeSummaryDetailsComponent,
    SellerTradePaymentDetailsComponent,
    TradePaymentDetailsComponent,
    SubscripitionComponent,
    SellerDispachComponent,
    SellerPaymentsComponent,
    BuyerPaymentsComponent,
    BuyerDeliveriesComponent,
    BuyerCompletedTradeComponent,
    SellerCompletedTradeComponent,
    SupportComponent

  ],
  imports: [
    ImageViewerModule.forRoot(),
    CommonModule,
    SharedModule,
    LandingRoutingModule,
    ExtrapagesModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    DropzoneModule,
    CountToModule,
    FeatherModule.pick(allIcons),
    NgbPaginationModule,
    NgbTypeaheadModule,
    ArchwizardModule,
    NgSelectModule,
    NgbTooltipModule,
    TablesModule,
    NgbDatepickerModule,
    FlatpickrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ],
  exports: [
    TradeComponent,
    CompleteProfileComponent,
    SellerTradeSummaryDetailsComponent
  ],
  providers:[
    DatePipe
  ]
})
export class LandingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { HomeComponent } from './home/home.component';
import { SellerTradeComponent } from './seller-trade/seller-trade.component';
import { SubscripitionComponent } from './subscripition/subscripition.component';
import { TradePaymentComponent } from './trade-payment/trade-payment.component';
import { TradeComponent } from './trade/trade.component';
import { BuyerCompletedTradeComponent } from './buyer-completed-trade/buyer-completed-trade.component';
import { SellerCompletedTradeComponent } from './seller-completed-trade/seller-completed-trade.component';
import { SupportComponent } from './support/support.component';
import { TradeSummaryComponent } from './trade-summary/trade-summary.component';
import { SellerTradeSummaryComponent } from './seller-trade-summary/seller-trade-summary.component';
import { SellerTradePaymentComponent } from './seller-trade-payment/seller-trade-payment.component';

const routes: Routes = [
    {
        path: 'subscripition',
        component: SubscripitionComponent
    },
    {
        path: 'user-home',
        component: HomeComponent
    },
    {
        path: 'complete-profile',
        component: CompleteProfileComponent
    },
    {
        path:'trade-active',
        component:TradeComponent
    },
    {
        path:'seller-trade-active',
        component:SellerTradeComponent
    },
    {
        path:'trade-payment',
        component:TradePaymentComponent
    },
    {
        path:'buyer-completed',
        component:BuyerCompletedTradeComponent
    },
    {
        path:'seller-completed',
        component:SellerCompletedTradeComponent
    },
    {
        path:'support',
        component:SupportComponent
    },
    {
        path:'buyer-tradesummary',
        component:TradeSummaryComponent
    },
    {
        path:'buyer-paymentsummary',
        component:TradePaymentComponent
    },
    {
        path:'seller-tradesummary',
        component:SellerTradeSummaryComponent
    },
    {
        path:'seller-paymentsummary',
        component:SellerTradePaymentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LandingRoutingModule { }

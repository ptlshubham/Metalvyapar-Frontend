import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { CommissionListComponent } from './commission-list/commission-list.component';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerTradeSummaryComponent } from './customer-trade-summary/customer-trade-summary.component';
import { PendingKycComponent } from './pending-kyc/pending-kyc.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { OrderInitiativeComponent } from './order-initiative/order-initiative.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { TopBuyerListComponent } from './top-buyer-list/top-buyer-list.component';
import { TopQualityListComponent } from './top-quality-list/top-quality-list.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';


const routes: Routes = [
    {
        path: 'buyer',
        component: BuyerListComponent
    },
    {
        path: 'seller',
        component: SellerListComponent
    },
    {
        path: 'rejectedKYC',
        component: ContactUsListComponent
    },
    {
        path: 'customer',
        component: CustomerListComponent
    },
    {
        path: 'trade',
        component: CustomerTradeSummaryComponent
    },
    {
        path: 'commission',
        component: CommissionListComponent
    },
    {
        path: 'pending-kyc',
        component: PendingKycComponent
    },
    {
        path: 'initiative',
        component: OrderInitiativeComponent
    },
    {
        path: 'masterTable',
        component: MasterTableComponent
    },
    {
        path: 'topbuyerlist',
        component: TopBuyerListComponent
    },
    {
        path: 'topqualitylist',
        component: TopQualityListComponent
    },
    {
        path: 'subscriptionlist',
        component: SubscriptionListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TradeListRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ls from 'localstorage-slim';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-summary',
  templateUrl: './seller-trade-summary.component.html',
  styleUrls: ['./seller-trade-summary.component.scss']
})
export class SellerTradeSummaryComponent implements OnInit {
  sellerTrade: any = [];
  sellerModel: any = {};
  sellerDetails: any = {};
  sellerData: any = [];

  isTradeOpen: boolean = false;
  paymentOpen: boolean = false;
  openDetails: boolean = false;

  upcomingDeliveriesId: any = null;
  constructor(
    private tradingService: TradeService,
    private activatedRoute: ActivatedRoute

  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.upcomingDeliveriesId = params['id'];
    });
  }

  ngOnInit(): void {
    this.isTradeOpen = true;
    this.tradingService.getAllTradingDatabyIdForSeller(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      if (res.length == 0) {
        this.sellerData.length = 0;
      } else {
        this.sellerData = res;
        this.sellerData.forEach((element: any) => {
          element.location = element.street + ' ' + element.city + ' ' + element.state;
        })
        this.sellerData.forEach((element: any) => {
          if (element.TradeStatus == 'Accepted')
            this.sellerTrade.push(element);
        })

      }
      if (this.upcomingDeliveriesId != null) {
        this.sellerTrade.forEach((element: any) => {
          if (element.SubOrderId == this.upcomingDeliveriesId) {
            this.sellerDetails = element;
            this.paymentOpen = false;
            this.isTradeOpen = false;
            this.openDetails = true;
          }
        });
      }
    })

  }
  acceptAndPay(data: any) {
    this.sellerModel = data;
    this.paymentOpen = true;
    this.isTradeOpen = false;
    this.openDetails = false;

  }
  backToSummary() {
    this.paymentOpen = false;
    this.isTradeOpen = true;
    this.openDetails = false;
  }
  viewTradeDetails(data: any) {
    this.sellerDetails = data
    this.paymentOpen = false;
    this.isTradeOpen = false;
    this.openDetails = true;
  }
}

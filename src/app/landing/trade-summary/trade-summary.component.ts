import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradeService } from 'src/app/core/services/trade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trade-summary',
  templateUrl: './trade-summary.component.html',
  styleUrls: ['./trade-summary.component.scss']
})
export class TradeSummaryComponent implements OnInit {
  buyerTrade: any = [];
  isBuyerOpenDetails: boolean = false;
  buyerData: any = [];
  openDetails: boolean = false;
  isBuyerOpen: boolean = false;
  buyerModel: any = {};
  buyerDetails: any = {};
  TradingResponse: any = [];
  reqQuality: any = '';
  upcomingDeliveriesId: any = null;

  constructor(
    public tradingService: TradeService,
    private activatedRoute: ActivatedRoute

  ) {
    this.isBuyerOpen = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.upcomingDeliveriesId = params['id'];
       
    });
  }

  ngOnInit(): void {
     
    this.tradingService.getAllTradingDatabyIdForBuyer(localStorage.getItem('UserId')).subscribe((res: any) => {
       
      if (res.length == 0) {
        this.buyerData.length = 0;
      } else {
        this.buyerData = res;
        this.buyerData.forEach((element: any) => {
          element.location = element.street+' '+element.city+' '+element.state;
          if(element.TradeStatus =='Accepted'){
            this.buyerTrade.push(element);
          }
            
        })

      }

    })
  }
  backToSummary() {
    this.isBuyerOpenDetails = true;
    this.openDetails = false;
  }
  backToActiveTrade() {
    this.isBuyerOpenDetails = false;
    this.isBuyerOpen = true;
  }

  viewTradeDetailsByTrade(data: any) {
     
    this.isBuyerOpenDetails = true;
    this.isBuyerOpen = false;;
    this.reqQuality = data.BuyerQuality;
    this.tradingService.GetSellerResponse(data.OrderId).subscribe((res: any) => {
      this.TradingResponse = [];
      res.forEach((element: any) => {
        if (element.TradeStatus == 'Accepted') {
          element.location = element.street + ' ' + element.city + ' ' + element.state;
          this.TradingResponse.push(element)
        }
      })
      // this.TradingResponse = res;
      // this.TradingResponse.forEach((element: any) => {
      //   element.location = element.street + ' ' + element.city + ' ' + element.state;
      // })
    })

  }
  viewDetailsByTrade(data: any) {
     
    this.buyerDetails = data;
    this.isBuyerOpenDetails = false;
    this.isBuyerOpen = false;
    this.openDetails = true;
  }
}

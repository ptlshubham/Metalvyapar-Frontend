import { Component, EventEmitter, OnInit, QueryList, ViewChildren } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { circle, latLng, tileLayer } from 'leaflet';

import { walletOverview, investedOverview, marketOverview, walletlineChart, tradeslineChart, investedlineChart, profitlineChart, recentActivity, News, transactionsAll, transactionsBuy, transactionsSell, qualityChart, topTenBuyerChart, tradeStatusChart } from './data';
import { ChartType } from './dashboard.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Router } from '@angular/router';
import { Table } from '../tables/datatable/datatable.model';
import { Observable } from 'rxjs';
import { dataTableSortableDirective, SortEvent } from '../tables/datatable/datatable-sortable.directive';
import { DataTableService } from '../tables/datatable/datatable.service';
import { tableData } from '../tables/datatable/data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 *  Dashboard Component
 */
export class DashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  buyerList: any = [];
  sellerList: any = [];
  pendingKycUserList: any = [];
  totalTrades: any = [];
  title!: string;
  dataSource!: Object;
  walletOverview!: ChartType;
  qualityChart!: ChartType;
  // topTenBuyerChart!: ChartType;
  tradeStatusChart!: ChartType;
  investedOverview!: ChartType;
  marketOverview!: ChartType;
  walletlineChart!: ChartType;
  tradeslineChart!: ChartType;
  investedlineChart!: ChartType;
  profitlineChart!: ChartType;
  recentActivity: any;
  News: any;
  transactionsAll: any;
  transactionsBuy: any;
  transactionsSell: any;
  dashboardTradeList: any;
  initializedOrder: any = [];
  responseApproved: any = [];
  rejectedTrade: any = [];
  masterTradeList: any = [];
  upcomingDelivery: any = [];
  completedTrades: any = [];
  initiatedOrder: any = [];
  totalSubscription:any=[];
  qualityCharts: ChartType = {
    chart: {
      width: 227,
      height: 227,
      type: 'pie',

      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => { console.log('click inside '); this.openTopQualityTable(event, chartContext, config); }
      },
    },
    colors: ["#0C134F", "#1D267D","#8294c4","#ACB1D6","#A5C0DD","#394867"],
    legend: { show: !1 },
    stroke: {
      width: 0
    },
    series: [35, 70, 15],
    labels: ["Ethereum", "Bitcoin", "Litecoin"],
  };
  topTenBuyerChart: ChartType = {
    chart: {
      width: 227,
      height: 227,
      type: 'pie',
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => { console.log('click inside '); this.openTopTenBuyerTable(event, chartContext, config); }
      },
    },
    colors: ["#1D267D","#0C134F", ,"#8294c4","#ACB1D6","#A5C0DD","#394867"],
    legend: { show: !1 },
    stroke: {
      width: 0
    },
    series: [35, 70, 15],
    labels: ["Ethereum", "Bitcoin", "Litecoin"],
  };


  tradeStatusCharts: ChartType = {
    chart: {
      width: 227,
      height: 227,
      type: 'pie',
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => { console.log('click inside '); this.opentradeByStatus(event, chartContext, config); }
      },
    },
    colors: ["#0C134F", "#1D267D","#8294c4","#ACB1D6","#A5C0DD","#394867"],
    legend: { show: !1 },
    stroke: {
      width: 0
    },
    series: [35, 70, 15],
    labels: ["Ethereum", "Bitcoin", "Litecoin"],
  };

  // Coin News Slider
  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ["", ""],
    dots: true,
    responsive: {
      680: {
        items: 4
      },
    }
  }

  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;
  toptenbuyer: any = [];
  totalCommision: number = 0;
  topTradeMaterial: any = [];
  topTradeStatus: any = [];
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    public service: DataTableService,
    public datepipe: DatePipe

  ) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }


  /**
   * Sale Location Map
   */
  options = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  layers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];


  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'DataTables', active: true }
    ];
    // setTimeout(() => {
    this.getBuyer().then(res => {
      this.getSeller();
    });

    this.getPendingKycUser().then(res => {
      this.getAllTrades();
    });;

    this.getAllTradeDashboard().then(res => {
      this.getAllCompletedTrade();
    });;;

    this.getTotalCommision().then(res => {
      this.getTopTenBuyerByCommision();
    });;;

    this.GetTopTradeQualityMaterial().then(res => {
      this.GetTopTradeStatus();
    });
    this.getInitiatedCount().then(res => {
      this.getPendingKycUser().then(res=>{
        this.GetSubscriptionCount();
      });
    });;


    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];
    this.fetchData();
  }



  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  getTotalCommision() {
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getTotalCommision().subscribe((res: any) => {
        this.totalCommision = res[0].TotalCom;
        resolve();
      });
    });
  }
  GetTopTradeStatus() {
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getTopTradeStatus().subscribe((res: any) => {
        this.topTradeStatus = res;
        this.tradeStatusCharts.series = [];
        this.tradeStatusCharts.labels = [];
        this.topTradeStatus.forEach((ele: any) => {
          this.tradeStatusCharts.labels.push(ele.TradeStatus);
          this.tradeStatusCharts.series.push(ele.totalTrade);
          // this.qualityCharts.dataLabels.push(ele.totalQuantityTrade);
        });
        resolve();
      })
    });
  }
  GetTopTradeQualityMaterial() {
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getTotalTradeQualityMaterial().subscribe((res: any) => {
        this.topTradeMaterial = res;
        this.qualityCharts.series = [];
        this.qualityCharts.labels = [];
        this.topTradeMaterial.forEach((ele: any) => {
          this.qualityCharts.labels.push(ele.BuyerQuality);
          this.qualityCharts.series.push(ele.totalQuantityTrade);
        });
        resolve();
      })
    });
  }
  GetSubscriptionCount(){
     
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getAllMembershipData().subscribe((res: any) => {
        this.totalSubscription = res;
         
        resolve();
      })
    });
  }
 
  openCommisionSummary(){
    this.router.navigate(['trade-list/commission']);
  }
 
  openTopTenBuyerTable(event: any, chartContext: any, config: any) {
    let test = config.w.config.labels[config.dataPointIndex];
    this.router.navigate(['trade-list/commission'], {
      queryParams: {
        data: test
      }
    })
  }
  openTopQualityTable(event: any, chartContext: any, config: any) {
    let test = config.w.config.labels[config.dataPointIndex];
    this.router.navigate(['trade-list/topqualitylist'], {
      queryParams: {
        data: test
      }
    })
  }
  opentradeByStatus(event: any, chartContext: any, config: any){
    let test = config.w.config.labels[config.dataPointIndex];
    this.router.navigate(['trade-list/masterTable'], {
      queryParams: {
        status: test
      }
    })


  }
  getAllCompletedTrade() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getCompletedTradeList().subscribe((res: any) => {
        this.completedTrades = res;
      });
    });
  }
  getAllTrades() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getAllTradeList().subscribe((res: any) => {
        this.totalTrades = res;
        this.totalTrades.forEach((element: any) => {
          if (element.TotalResponse == 0) {
            this.initializedOrder.push(element);
          }
        })
      });
    });
  }
  getAllTradeDashboard() {
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getDashboardTradeList().subscribe((res: any) => {
        this.dashboardTradeList = res;
        this.dashboardTradeList.forEach((ele: any) => {
          this.masterTradeList.push(ele);
          if (ele.TradeStatus == 'Accepted') {
            this.responseApproved.push(ele);
          }
          else if (ele.TradeStatus == 'Rejected') {
            this.rejectedTrade.push(ele);
          }
        });
        resolve();
      })
    });

  }
  getTopTenBuyerByCommision() {
    this.dashboardService.getTopTenBuyerByCommision().subscribe((res: any) => {
      this.toptenbuyer = res;
      this.topTenBuyerChart.series = [];
      this.topTenBuyerChart.labels = [];
      this.toptenbuyer.forEach((ele: any) => {
        this.topTenBuyerChart.labels.push(ele.userRecord.CompanyName);
        this.topTenBuyerChart.series.push(ele.CommisionAmount);
      })
    })
  }
  getInitiatedCount() {
     
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getInitiatedOrderList().subscribe((res: any) => {
        this.initiatedOrder = res;
         
        resolve();
      })
    });

  }


  getBuyer() {
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getBuyerList().subscribe((res: any) => {
        this.buyerList = res;
        resolve();
      })
    });

  }
  getSeller() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getSellerList().subscribe((res: any) => {
        this.sellerList = res;
      })
    });

  }
  getPendingKycUser() {
    return new Promise<void>((resolve, reject) => {
      this.dashboardService.getKycPendingList().subscribe((res: any) => {
        this.pendingKycUserList = res;
        resolve();
      })
    });
  }


  /**
   * Fetches the data
   */
  private fetchData() {
    this.walletOverview = walletOverview;
    this.qualityChart = qualityChart;
    // this.topTenBuyerChart = topTenBuyerChart;
    this.tradeStatusChart = tradeStatusChart;
    this.investedOverview = investedOverview;
    this.marketOverview = marketOverview;
    this.walletlineChart = walletlineChart;
    this.tradeslineChart = tradeslineChart;
    this.investedlineChart = investedlineChart;
    this.profitlineChart = profitlineChart;
    this.recentActivity = recentActivity;
    this.News = News;
    this.transactionsAll = transactionsAll;
    this.transactionsBuy = transactionsBuy;
    this.transactionsSell = transactionsSell;
  }

  openSubscriptionList() {
    // this.router.navigate(['trade']);
    this.router.navigate(['trade-list/subscriptionlist']);
  }
  openMasterTradeList(data: any) {
    this.router.navigate(['trade-list/trade'], {
      queryParams: {
        type: 'All',
        tradelist: JSON.stringify(data)
      }
    });
  }
  openOrderInitiative(data: any) {
    this.router.navigate(['trade-list/initiative']);
  }
  openApprovedTradeList(data: any) {
    this.router.navigate(['trade-list/trade'], {
      queryParams: {
        type: 'approved',
        tradelist: JSON.stringify(data)
      }
    });
  }
  openRejectedTradeList(data: any) {
    this.router.navigate(['trade-list/trade'], {
      queryParams: {
        type: 'rejected',
        tradelist: JSON.stringify(data)
      }
    });
  }
  openCompletedTradeList(data: any) {
    this.router.navigate(['trade-list/trade'], {
      queryParams: {
        type: 'completed',
        tradelist: JSON.stringify(data)
      }
    });
  }

  openUserList(val: any) {
    if (val == 'pendingKyc') {
      this.router.navigate(['trade-list/pending-kyc']);
    } else if (val == 'Buyer') {
      this.router.navigate(['trade-list/customer'], {
        queryParams: {
          type: 'Buyer'
        }
      });
    } else {
      this.router.navigate(['trade-list/customer'], {
        queryParams: {
          type: 'Seller'
        }
      });
    }

  }


}
function Output(): (target: DashboardComponent, propertyKey: "open") => void {
  throw new Error('Function not implemented.');
}


import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { Observable } from 'rxjs/internal/Observable';
import { TradeService } from 'src/app/core/services/trade.service';
import { tableData } from 'src/app/pages/tables/datatable/data';
import { dataTableSortableDirective, SortEvent } from 'src/app/pages/tables/datatable/datatable-sortable.directive';
import { SortablePayDirective } from 'src/app/pages/tables/datatable/datatable-sortablePay.directive';
import { Table, TablePayment } from 'src/app/pages/tables/datatable/datatable.model';
import { DataTableService } from 'src/app/pages/tables/datatable/datatable.service';
import { DataTablePayService } from 'src/app/pages/tables/datatable/datatablePay.service';
import { paymentData } from 'src/app/pages/tables/datatable/patmentData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  openNewRequest: boolean = false;
  openTSummary: boolean = false;
  openPaymentSumm: boolean = false;
  role: any;
  allTradingListBuyer: any = [];
  newTradingListBuyer: any = [];
  weekTradeCountBuyer: number = 0;
  allTradingListSeller: any = [];
  newTradingListSeller: any = [];
  weekTradeCountSeller: number = 0;
  tradeSummaryCount: any = [];
  tradeSummaryLength: any = [];
  paymentSummary: any = [];
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;


  @ViewChildren(SortablePayDirective)
  header!: QueryList<SortablePayDirective>;

  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;
  table$!: Observable<TablePayment[]>;
  totals$!: Observable<number>;

  constructor(
    private router: Router,
    private tradingService: TradeService,
    public service: DataTableService,
    public services: DataTablePayService,
    public datepipe: DatePipe,
  ) {
    // for delivery
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
    //for payment
    this.table$ = this.services.table$;
    this.totals$ = this.services.totals$;
  }

  ngOnInit(): void {
    tableData.forEach((element, index) => {
      delete tableData[index];
    });
    tableData.length = 0;
    paymentData.forEach((element, index) => {
      delete paymentData[index];
    });
    paymentData.length = 0;
    this.role = ls.get('Role', { decrypt: true });
     
    if (this.role == 'Buyer') {
      this.getUpcomingDeliveryBuyer().then(res=>{
        this.getUpcomingPaymentBuyer().then(res=>{
          this.tradingService.getAllTradingDatabyIdForBuyer(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
             
            if (res.length == 0) {
              this.allTradingListBuyer.length = 0;
              this.allTradingListBuyer.forEach((element: any) => {
                if (element.IsActive) {
                  this.newTradingListBuyer.push(element);
                }
                let olddate = this.getLastWeeksDate().toISOString();
                if (element.createdDate >= olddate) {
                  this.weekTradeCountBuyer++;
                }
              });
            } else {
              this.allTradingListBuyer = res;
              this.tradeSummaryCount = [];
              this.allTradingListBuyer.forEach((element: any) => {
                if ((element.TradeStatus == 'Accepted' )) {
                  this.tradeSummaryCount.push(element);
                }
                if (element.IsActive) {
                  this.newTradingListBuyer.push(element);
                }
              });
            
            }
          })
        });;
      });
     
    } else {
      this.getAllTradingDatabyIdForSeller().then(res=>{
        this.getUpcomingPaymentSeller().then(res =>{
          this.getNewTradeReqForSeller().then(res=>{
           this.getUpcomingDeliverySeller();
          })
        })
      });
    }
  }
  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
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
  onSortPay({ column, direction }: any) {
    // resetting other headers
    this.header.forEach(header => {
      if (header.sortablepay !== column) {
        header.direction = '';
      }
    });
    this.services.sortColumn = column;
    this.services.sortDirection = direction;
  }
  getAllTradingDatabyIdForSeller(){
    return new Promise<void>((resolve, reject) => {
      this.tradingService.getAllTradingDatabyIdForSeller(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
        this.newTradingListSeller = [];
        this.tradeSummaryLength = [];
        if (res.length == 0) {
          this.allTradingListSeller.length = 0;
        } else {
          this.allTradingListSeller = res;
          this.tradeSummaryCount = [];
          this.allTradingListSeller.forEach((element: any) => {
            const now = new Date();
            let dt =new Date(now.getFullYear(), now.getMonth(), now.getDate() );
            if ((element.TradeStatus == 'Accepted' || element.TradeStatus == 'Rejected')&& !element.IsDeleted) {
              this.tradeSummaryCount.push(element);
            }
            if (element.TradeStatus == 'Accepted' ) {
              this.tradeSummaryLength.push(element);
            }
            if (element.TradeStatus == 'Pending' && element.OrderCreatDate >= dt.toISOString()) {
              this.newTradingListSeller.push(element);
            }
          });
        }
      });
      resolve();
      })
  }
  getNewTradeReqForSeller(){
    return new Promise<void>((resolve, reject) => {
      this.tradingService.newTradeReqForSeller().subscribe((res: any) => {
        res.forEach((ele: any) => {
          this.newTradingListSeller.push(ele);
        })
        resolve();
      })
    });
   
  }

  getLastWeeksDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() );
  }
  getUpcomingDeliveryBuyer() {
    return new Promise<void>((resolve, reject) => {
      let body = {
        buyerId: ls.get('UserId', { decrypt: true })
      }
      this.tradingService.getUpcomingDeliveryBuyer(body).subscribe((res: any) => {
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        res.forEach((ele: any, ind: number) => {
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          let data: any = {
            srno: ind + 1,
            Date: this.datepipe.transform(ele.TradeCreatedDate, 'dd/MM/yyyy '),
            OrderId: ele.OrderId+'',
            TradeId: ele.SubOrderId+'',
            Quality: ele.BuyerQuality+'',
            BuyerName: ele.BuyerName,
            SellerName: ele.SellerName,
            DeliveryDue: this.datepipe.transform(ele.DispatchDate, 'dd/MM/yyyy '),
            BuyerLocation: 'string',
            BuyerQuantity: 'string',
            Time:'string',
            BuyerRate: 10,
            PaymentTerms:'string',
            SellerLocation:'string',
            SellerQuantity:'string',
            DeliveryTerms:'string',
            MaterialImage:'string',
            Status:'string',
            TradeValidity:'string',
            SellerResponse:0,
            PaymentDate:'string',
            RejectedMessage:'string',
            DispatchDate:'string',
            Quantity:10,
            InvoiceAmount:10,
            InvoiceImage:'string',
            WeightSlip:'string',
            VehicleNumber:'string',
            TransporterContact:'string',
            DeliveryDate:'string',
            DeliveryWeightSlip:'string',
            PaymentDueDate:'string',
            UtrNo:'string',
            PaymentScreenshot:'string',
            Commision:'string',
            Name:'string',
            Address:'string',
            Location:'strin',
            AverageMonthQuantity:100,
            Salutation:'string',
            FirstName:'string',
            LastName:'string',
            Designation:'string',
            PhoneNo:'100',
            AlternateNo:'100',
            Email:'string',
            Password:'string',
            GSTNo:'string',
            PANNo:'string',
            BankName:'string',
            AccountName:'string',
            AccountNo:'100',
            AccountType:'string',
            IFSCCode:'string',
            BankBranch:'string',
            CancelCheque:'string',
            CustomerName:'string',
            Role:'string',
            StartDate: 'string',
            EndDate: 'string',
            Remaining: 'string',
            //trade details
          }
          tableData.push(data);
        })
      })
      resolve();
    });
   
  }
  openUpcomingDeliveriesForBuyer(id: any) {
    this.router.navigate(['/landing/buyer-tradesummary'], {
      queryParams: {
        id: id
      }
    });
  }
  openUpcomingPaymentsForBuyer(id: any) {
    this.router.navigate(['/landing/buyer-paymentsummary'], {
      queryParams: {
        id: id
      }
    });
  }
  viewUpcomingDispachForSeller(id: any) {
    this.router.navigate(['/landing/seller-tradesummary'], {
      queryParams: {
        id: id
      }
    });
  }
  viewUpcomingPaymentsForSeller(tId: any) {
    this.router.navigate(['/landing/seller-paymentsummary'], {
      queryParams: {
        id: tId
      }
    });
  }
  getUpcomingPaymentBuyer() {
    return new Promise<void>((resolve, reject) => {
    let body = {
      buyerId: ls.get('UserId', { decrypt: true })
    }
    this.tradingService.getUpcomingPaymentBuyer(body).subscribe((res: any) => {
      paymentData.forEach((element, index) => {
        delete paymentData[index];
      });
      paymentData.length = 0;
      res.forEach((ele: any, ind: number) => {
        let data: any = {
          srno: ind + 1,
          TradeDate: this.datepipe.transform(ele.TradeCreatedDate, 'dd/MM/yyyy '),
          TradeId: ele.SubOrderId,
          BuyerName: ele.BuyerName,
          SellerName: ele.SellerName,
          InvoiceAmount: ele.InvoiceAmount,
          PaymentDueDate: this.datepipe.transform(ele.DueDate, 'dd/MM/yyyy '),
        }
        paymentData.push(data);
      })
    })
      resolve();
    });



  }

  getUpcomingDeliverySeller() {
    return new Promise<void>((resolve, reject) => {
      let body = {
        sellerId: ls.get('UserId', { decrypt: true })
      }
      this.tradingService.getUpcomingDeliverySeller(body).subscribe((res: any) => {
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        res.forEach((ele: any, ind: number) => {
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          let data: any = {
            srno: ind + 1,
            Date: this.datepipe.transform(ele.TradeCreatedDate, 'dd/MM/yyyy '),
            OrderId: ele.OrderId+'',
            TradeId: ele.SubOrderId+'',
            Quality: ele.BuyerQuality+'',
            BuyerName: ele.BuyerName,
            SellerName: ele.SellerName,
            DeliveryDue: this.datepipe.transform(ele.DispatchDate, 'dd/MM/yyyy '),
            Time: 'string',
            BuyerLocation: 'string',
            BuyerQuantity: 'string',
            BuyerRate: 10,
            PaymentTerms:'string',
            SellerLocation:'string',
            SellerQuantity:'string',
            DeliveryTerms:'string',
            MaterialImage:'string',
            Status:'string',
            TradeValidity:'string',
            SellerResponse:0,
            PaymentDate:'string',
            RejectedMessage:'string',
            DispatchDate:'string',
            Quantity:10,
            InvoiceAmount:10,
            InvoiceImage:'string',
            WeightSlip:'string',
            VehicleNumber:'string',
            TransporterContact:'string',
            DeliveryDate:'string',
            DeliveryWeightSlip:'string',
            PaymentDueDate:'string',
            UtrNo:'string',
            PaymentScreenshot:'string',
            Commision:'string',
            Name:'string',
            Address:'string',
            Location:'strin',
            AverageMonthQuantity:100,
            Salutation:'string',
            FirstName:'string',
            LastName:'string',
            Designation:'string',
            PhoneNo:'100',
            AlternateNo:'100',
            Email:'string',
            Password:'string',
            GSTNo:'string',
            PANNo:'string',
            BankName:'string',
            AccountName:'string',
            AccountNo:'100',
            AccountType:'string',
            IFSCCode:'string',
            BankBranch:'string',
            CancelCheque:'string',
            CustomerName:'string',
            Role:'string',
            StartDate: 'string',
            EndDate: 'string',
            Remaining: 'string',
            IsActive:1
            //trade details
  
          }
          tableData.push(data);
        })
        resolve();
      })
    });
   
  }
  getUpcomingPaymentSeller() {
    return new Promise<void>((resolve, reject) => {
    let body = {
      sellerId: ls.get('UserId', { decrypt: true })
    }
    this.tradingService.getUpcomingPaymentSeller(body).subscribe((res: any) => {
      paymentData.forEach((element, index) => {
        delete paymentData[index];
      });
      paymentData.length = 0;
      res.forEach((ele: any, ind: number) => {
        let data: any = {
          srno: ind + 1,
          TradeDate: this.datepipe.transform(ele.TradeCreatedDate, 'dd/MM/yyyy '),
          TradeId: ele.SubOrderId,
          BuyerName: ele.BuyerName,
          SellerName: ele.SellerName,
          InvoiceAmount: ele.InvoiceAmount,
          PaymentDueDate: this.datepipe.transform(ele.DueDate, 'dd/MM/yyyy '),
        }
        paymentData.push(data);
      })
        resolve();
      })
    });
  }

  getUpcomingSeller() {
    let body = {
      buyerId: ls.get('UserId', { decrypt: true })
    }
    this.tradingService.getUpcomingDeliverySeller(body).subscribe((res: any) => {
    })
  }

  openNewTrade() {
    this.openNewRequest = true;
    this.openTSummary = false;
    this.openPaymentSumm = false;
    if (this.role == 'Buyer') {
      this.router.navigate(['/landing/trade-active']);
    }
    else {
      this.router.navigate(['/landing/seller-trade-active']);
    }

  }
  openTradeSummary() {
    this.openTSummary = true;
    this.openNewRequest = false;
    this.openPaymentSumm = false;
    if (this.role == 'Buyer') {
      this.router.navigate(['/landing/buyer-tradesummary']);
    }
    else {
      this.router.navigate(['/landing/seller-tradesummary']);
    }

  }
  openPaymentSummary() {
    this.openTSummary = false;
    this.openNewRequest = false;
    this.openPaymentSumm = true;
    if (this.role == 'Buyer') {
      this.router.navigate(['/landing/buyer-paymentsummary']);
    }
    else {
      this.router.navigate(['/landing/seller-paymentsummary']);
    }
  }
  openHelpSupport() {
    this.router.navigate(['/landing/support']);
  }
}

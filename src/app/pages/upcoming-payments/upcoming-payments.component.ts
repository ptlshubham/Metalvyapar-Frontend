import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TablePayment } from '../tables/datatable/datatable.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { paymentData } from '../tables/datatable/patmentData';
import { DataTablePayService } from '../tables/datatable/datatablePay.service';
import { SortablePayDirective } from '../tables/datatable/datatable-sortablePay.directive';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upcoming-payments',
  templateUrl: './upcoming-payments.component.html',
  styleUrls: ['./upcoming-payments.component.scss']
})
export class UpcomingPaymentsComponent implements OnInit {

  @ViewChildren(SortablePayDirective)
  headers!: QueryList<SortablePayDirective>;
  tableData!: TablePayment[];
  hideme: boolean[] = [];

  tables$!: Observable<TablePayment[]>;
  total$!: Observable<number>;

  upcomingPayment: any = [];
  constructor(
    public service: DataTablePayService,
    public datepipe: DatePipe,
    private dashboardService: DashboardService,
    private router:Router

  ) {
    this.tables$ = this.service.table$;
    this.total$ = this.service.totals$;
  }

  ngOnInit(): void {
    this.getUpcomingPaymentList();
  }
  /**
* Sort table data
* @param param0 sort the column
*
*/
onSortPay({ columnPay, direction }: any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortablepay !== columnPay) {
        header.direction = '';
      }
    });
    this.service.sortColumn = columnPay;
    this.service.sortDirection = direction;
  }
  getUpcomingPaymentList() {
    this.dashboardService.getUpcomingPaymentAdmin().subscribe((res: any) => {
      paymentData.forEach((element, index) => {
        delete paymentData[index];
      });
      paymentData.length = 0;
      this.upcomingPayment = res;
       
      this.upcomingPayment.forEach((ele: any, ind: number) => {
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

    });
  }
  openDetails(data:any){
    this.router.navigate(['/trade-list/trade'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

}

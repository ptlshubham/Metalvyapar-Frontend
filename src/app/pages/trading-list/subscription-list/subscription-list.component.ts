import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { dataTableSortableDirective, SortEvent } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;

  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;
  subscriptionData: any = [];
  constructor(
    public service: DataTableService,
    private dashboardService: DashboardService,
    public datepipe: DatePipe,

  ) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
   }

  ngOnInit(): void {
    this.getMembership();
  }
  getMembership() {
    this.dashboardService.getAllMembershipData().subscribe((res: any) => {
      this.subscriptionData = res;
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      this.subscriptionData.forEach((ele: any, ind: any) => {
        ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
        let data: any = {
          srno: ind + 1,
          StartDate:this.datepipe.transform(ele.startdate, 'dd/MM/yyyy '),
          EndDate:this.datepipe.transform(ele.enddate, 'dd/MM/yyyy '),
          Remaining:ele.remainingdays,
          Status:ele.status,
          TradeId:'',
          Date: "date",
          Date1: "ele.CreatedDate",
          Time: "this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a')",
          OrderId: '' ,
          Quality: "ele.BuyerQuality",
          BuyerName: 'ele.BuyerName',
          BuyerLocation:'ele.BuyerState',
          BuyerQuantity: 'ele.BuyerQuantity',
          BuyerRate: 0,
          PaymentTerms: 'ele.PaymentDay',
          SellerName: 'ele.SellerName',
          SellerLocation: '' ,
          SellerQuantity: '' ,
          DeliveryTerms: 'ele.DeliveryTerms',
          MaterialImage: 'ele.MaterialImage',
          Commision: 'ele.ComissionAmount',
          DispatchDate: 'string',
          Quantity: 10,
          InvoiceAmount: 10,
          InvoiceImage: 'string',
          WeightSlip: 'string',
          VehicleNumber: 'string',
          TransporterContact: 'string',
          DeliveryDate: 'string',
          DeliveryWeightSlip: 'string',
          PaymentDueDate: 'string',
          UtrNo: 'string',
          PaymentScreenshot: 'string',
          FirstName: 'string',
          LastName: 'string',
          location: 'string',
          Role: ele.Role,
          MaterialQuality: 'string',
          KYCStatus: 'string',
          companyName: 'string',
          street: 'string',
          PaymentDate: 'this.datepipe',
          DeliveryDue: 'ele',
          TradeValidity: 'ele',
          SellerResponse: 0,
          RejectedMessage: 'ele',
          Name: ele.CompanyName,
          Address: 'ele',
          Location: ele.location,
          AverageMonthQuantity: 100,
          Salutation: 'ele',
          Designation: 'ele',
          PhoneNo: '100',
          AlternateNo: '100',
          Email: 'ele',
          Password: 'ele',
          GSTNo: 'ele',
          PANNo: 'ele',
          BankName: 'ele',
          AccountName: 'ele',
          AccountNo: '100',
          AccountType: 'ele',
          IFSCCode: 'ele',
          BankBranch: 'ele',
          CancelCheque: 'ele',
          CustomerName: 'ele',
          IsActive:1,
          IsSubscribe:1
        }
         
        tableData.push(data);
      })
    })

  }
  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}

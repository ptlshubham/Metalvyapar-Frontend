import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SortEvent, dataTableSortableDirective } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-top-buyer-list',
  templateUrl: './top-buyer-list.component.html',
  styleUrls: ['./top-buyer-list.component.scss']
})
export class TopBuyerListComponent implements OnInit {

  
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>; 
  buyerList:any=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    public service: DataTableService,
    public datepipe: DatePipe,
    private router:Router
  ) {
    
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((res: any) => {
        this.buyerList = JSON.parse(res.data);
         
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        this.buyerList.forEach((ele: any, ind: number) => {
           
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          let data: any = {
            srno: ind + 1,
            InvoiceAmount:ele.CommisionAmount,
            BuyerName: ele.userRecord.CompanyName,
            DispatchDate: 'ele',
            Quantity: 10,
            Quality: 'ele',
            WeightSlip: 'ele',
            VehicleNumber: 'ele',
            TransporterContact: 'ele',
            DeliveryDate: 'ele',
            DeliveryWeightSlip: 'ele',
            PaymentDueDate: 'ele',
            UtrNo: 'ele',
            PaymentScreenshot: 'ele',
            //customers
            FirstName: 'ele',
            LastName: 'ele',
            location: 'ele',
            Role: 'ele',
            MaterialQuality: 'ele',
            KYCStatus: 'ele',
            companyName: 'ele',
            street: 'ele',
            Date: 'ele',
            Time: 'ele',
            OrderId: 'ele',
            TradeId:''+ ele.OrderId,
            BuyerLocation: 'ele',
            BuyerQuantity: 'ele',
            BuyerRate: 10,
            PaymentTerms: 'ele',
            SellerName: 'ele',
            SellerLocation: 'ele',
            SellerQuantity: 'ele',
            DeliveryTerms: ' ele',
            MaterialImage: 'ele',
            Status: 'ele',
            InvoiceImage: 'ele',
            PaymentDate:'ele',
            DeliveryDue:'ele',
            TradeValidity:'ele',
            SellerResponse:0,
            RejectedMessage:'ele',
            Commision:'ele',
            Name:'ele',
            Address:'ele',
            Location:'strin',
            AverageMonthQuantity:100,
            Salutation:'ele',
            Designation:'ele',
            PhoneNo:'100',
            AlternateNo:'100',
            Email:'ele',
            Password:'ele',
            GSTNo:'ele',
            PANNo:'ele',
            BankName:'ele',
            AccountName:'ele',
            AccountNo:'100',
            AccountType:'ele',
            IFSCCode:'ele',
            BankBranch:'ele',
            CancelCheque:'ele',
            CustomerName:'ele',
          }
          // this.exelList.push(data);
          tableData.push(data);
        })
      });
  }
  back(){
     
    this.router.navigate(['/']);
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
}

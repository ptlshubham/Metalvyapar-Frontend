import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Table } from '../tables/datatable/datatable.model';
import { Observable } from 'rxjs';
import { dataTableSortableDirective } from '../tables/datatable/datatable-sortable.directive';
import { DataTableService } from '../tables/datatable/datatable.service';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { tableData } from '../tables/datatable/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TradeService } from 'src/app/core/services/trade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-deliveries',
  templateUrl: './upcoming-deliveries.component.html',
  styleUrls: ['./upcoming-deliveries.component.scss']
})
export class UpcomingDeliveriesComponent implements OnInit {

  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;
  viewDetails: boolean = false;
  upcomingDelivery: any = [];
  tradeTransportDetails: any = [];

  @ViewChild('imageViewer')
  viewer!: UpcomingDeliveriesComponent;
  multiMaterialImages: any = [];
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];
  constructor(
    public service: DataTableService,
    public datepipe: DatePipe,
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
    this.getUpcomingDeliveryList();
  }

  centerModal(centerDataModal: any, imagesrc: any, tradeId: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  /**
* Sort table data
* @param param0 sort the column
*
*/
  onSort({ column, direction }: any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  getUpcomingDeliveryList() {
    this.dashboardService.getUpcomingDeliveryAdmin().subscribe((res: any) => {
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      tableData.length = 0;
      this.upcomingDelivery = res;
      this.upcomingDelivery.forEach((ele: any, ind: number) => {
        ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
        let data: any = {
          srno: ind + 1,
          Date: this.datepipe.transform(ele.TradeCreatedDate, 'dd/MM/yyyy '),
          OrderId: ele.OrderId+'',
          TradeId: ele.SubOrderId+'',
          Time:'string',
          Quality: ele.BuyerQuality+'',
          BuyerName: ele.BuyerName,
          SellerName: ele.SellerName,
          DeliveryDue: this.datepipe.transform(ele.DispatchDate, 'dd/MM/yyyy '),
          DispatchDate: 'sting',
          Quantity: 10,
          InvoiceAmount: 10,
          InvoiceImage: 'string',
          WeightSlip: 'string',
          VehicleNumber: 'string',
          TransporterContact: 'string',
          DeliveryWeightSlip: 'string',
          PaymentDueDate: 'string',
          UtrNo: 'string',
          PaymentScreenshot: 'string',
          FirstName: 'string',
          LastName: 'string',
          location: 'string',
          Role: 'string',
          MaterialQuality: 'string',
          KYCStatus: 'string',
          companyName: 'string',
          street: 'string',
          BuyerQuantity: 'string',
          BuyerRate: 10,
          PaymentTerms:'string',
          SellerLocation:'string',
          BuyerLocation:'string',
          SellerQuantity:'string',
          DeliveryTerms:'string',
          MaterialImage:'string',
          Status:'string',
          TradeValidity:'string',
          SellerResponse:0,
          PaymentDate:'string',
          RejectedMessage:'string',
          Commision:'string',
          Name:'string',
          Address:'string',
          Location:'strin',
          AverageMonthQuantity:100,
          Salutation:'string',
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
          StartDate: 'string',
          EndDate: 'string',
          Remaining: 'string',
        }
        tableData.push(data);
      })

    });
  }
  openDetails(data: any) {
    this.router.navigate(['/trade-list/trade'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }
  backToResponseList() {
    this.viewDetails = false;
    this.getUpcomingDeliveryList();
  }


}

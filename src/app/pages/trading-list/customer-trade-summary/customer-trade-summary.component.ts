import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { dataTableSortableDirective, SortEvent } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { tableData } from '../../tables/datatable/data';
import * as XLSX from 'xlsx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-trade-summary',
  templateUrl: './customer-trade-summary.component.html',
  styleUrls: ['./customer-trade-summary.component.scss']
})
export class CustomerTradeSummaryComponent implements OnInit {

  @ViewChild("table1")
  table!: ElementRef;

  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';
  selectedDateRange: any;
  selectedDates: any;
  type: any;
  isaprrjt: boolean = false;
  isrjct: boolean = false;
  isDetail: boolean = false;
  viewDetails: boolean = false;
  isCompleted: boolean = false;
  isbackToResponse: boolean = false;
  selectedOrder: any = {};
  tradeTransportDetails: any = [];
  totalTradesResponse: any = [];
  buyerModel: any = {};
  tradeList: any = []
  exelList: any = [];
  TradedQuantity: any = 0;
  TotalSellQuantity: any = 0;
  RemainQuantity: any = 0;
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  cancelMessage: any;
  @ViewChild('imageViewer')
  viewer!: CustomerTradeSummaryComponent;
  multiMaterialImages: any = [];
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];
  upcomingDeliveriesObject: any = null;

  constructor(
    public service: DataTableService,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private tradeService: TradeService,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.upcomingDeliveriesObject = JSON.parse(res.data);
      if (this.upcomingDeliveriesObject != null) {
        this.isbackToResponse = true;
        this.viewTradeDetailsBySubtrade(this.upcomingDeliveriesObject);
      }
    });
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'DataTables', active: true }
    ];
    this.tableData = tableData;
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.type = res.type;
      if (this.type == 'approved') {
        this.isaprrjt = true;
      } else if (this.type == 'rejected') {
        this.isrjct = true;
      }
      else if (this.type == 'completed') {
        this.isCompleted = true;
        this.isaprrjt = false;
        this.isDetail = false;
        this.isrjct = false;
      }
      this.tradeList = JSON.parse(res.tradelist);
      // this.tableData = this.tradeList;
      //  tableData.splice(1,1);
      //  tableData.pop();
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      tableData.length = 0;
      this.tradeList.forEach((ele: any, ind: number) => {
         
        ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
        let pd: any;
        if (ele.IsDeleted) {
          pd = 'Deleted';
        } else {
          pd = ele.TradeStatus
        }
        let data: any = {
          DeliveryDue: this.datepipe.transform(ele.DispatchDate, 'MM/dd/yyyy '),
          Name: 'ele',
          Location: ele.city + ', ' + ele.state,
          srno: ind + 1,
          Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
          Date1: ele.CreatedDate,
          Time: this.datepipe.transform(ele.CreatedDate, 'h:mm:ss a'),
          OrderId: '' + ele.OrderId + ' ',
          TradeId: ele.SubOrderId,
          Quality: ele.BuyerQuality,
          BuyerName: ele.BuyerName,
          BuyerLocation: ele.BuyerCity + ',' + ele.BuyerState,
          BuyerQuantity: ele.BuyerQuantity,
          BuyerRate: ele.BuyerRate,
          PaymentTerms: '' + ele.PaymentDays,
          SellerName: ele.SellerName,
          SellerLocation: ele.SellerCity + ',' + ele.SellerState,
          SellerQuantity: '' + ele.SellerQuantity,
          DeliveryTerms: '' + ele.DeliveryTerms,
          MaterialImage: ele.MaterialImage,
          Status: pd,
          RejectedMessage: ele.RejectedMessage,
          PaymentDate: 'ele',
          SellerResponse: 100,
          DispatchDate: 'ele',
          Quantity: 100,
          InvoiceAmount: 100,
          InvoiceImage: 'ele',
          WeightSlip: 'ele',
          VehicleNumber: 'ele',
          TransporterContact: 'ele',
          DeliveryWeightSlip: 'ele',
          PaymentDueDate: 'ele',
          UtrNo: 'ele',
          PaymentScreenshot: 'ele',
          Address: 'ele',
          AverageMonthQuantity: 10,
          Salutation: 'ele',
          FirstName: 'ele',
          LastName: 'ele',
          Designation: 'ele',
          PhoneNo: 'ele',
          AlternateNo: 'ele',
          Email: 'ele',
          Password: 'ele',
          GSTNo: 'ele',
          PANNo: 'ele',
          BankName: 'ele',
          AccountName: 'ele',
          AccountNo: 'ele',
          AccountType: 'ele',
          IFSCCode: 'ele',
          BankBranch: 'ele',
          CancelCheque: 'ele',
          Role: 'ele',
        }
        this.exelList.push(data);
        tableData.push(data);
      })
    });

  }
  // _fetchData() {
  //   this.tableData = this.tableData;

  // }
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
  backToTradeList() {
    this.isDetail = false;
  }
  /**
* Open center modal
* @param centerDataModal center modal data
*/
  centerModal(centerDataModal: any, imagesrc: any, tradeId: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    if (tradeId != null) {
      this.tradeService.getMaterialImageById(tradeId).subscribe((res: any) => {
        this.multiMaterialImages = res;
        this.multiMaterialImages.forEach((element: any) => {
          if (element.image) {
            this.images.push(this.url + '' + element.image);
          }
        });
      })
    }
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  closeActiveTrade() {
    let data = {
      OrderId: this.tradeTransportDetails[0].OrderId
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Accept',
        cancelButtonText: 'Reject!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.tradeService.closeTradeFromAdmin(data).subscribe((res: any) => {
            if (res == 'sucess') {
              this.router.navigate(['/'])
            }
          })
          swalWithBootstrapButtons.fire(
            'Trade Closed',
            'Your trade has been closed.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your trade not close :)',
            'error'
          );
        }
      });


  }
  onSelectedDatesChange(newDates: any) {
    if (newDates.from != undefined && newDates.to != undefined) {
      this.dashboardService.getMasterDataByDateRange(newDates).subscribe((res: any) => {
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        res.forEach((ele: any, ind: number) => {
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          let data: any = {
            srno: ind + 1,
            Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
            Date1: ele.CreatedDate,
            Time: this.datepipe.transform(ele.CreatedDate, 'h:mm:ss a'),
            OrderId: '' + ele.OrderId + ' ',
            TradeId: ele.SubOrderId,
            Quality: ele.BuyerQuality,
            BuyerName: ele.BuyerName,
            BuyerLocation: ele.BuyerCity + ',' + ele.BuyerState,
            BuyerQuantity: ele.BuyerQuantity,
            BuyerRate: ele.BuyerRate,
            PaymentTerms: '' + ele.PaymentDays,
            SellerName: ele.SellerName,
            SellerLocation: ele.SellerCity + ',' + ele.SellerState,
            SellerQuantity: '' + ele.SellerQuantity,
            DeliveryTerms: '' + ele.DeliveryTerms,
            MaterialImage: ele.MaterialImage,
            Status: ele.TradeStatus,
            DispatchDate: 'ele',
            Quantity: 10,
            InvoiceAmount: 10,
            InvoiceImage: 'ele',
            WeightSlip: 'ele',
            VehicleNumber: 'ele',
            TransporterContact: 'ele',
            DeliveryDate: 'ele',
            DeliveryWeightSlip: 'ele',
            PaymentDueDate: 'ele',
            UtrNo: 'ele',
            PaymentScreenshot: 'ele',
            FirstName: 'ele',
            LastName: 'ele',
            location: 'ele',
            Role: 'ele',
            MaterialQuality: 'ele',
            KYCStatus: 'ele',
            companyName: 'ele',
            street: 'ele',
            DeliveryDue: 'ele',
            PaymentDate: 'ele',
            SellerResponse: 100,
            Name: 'ele',
            Location: 'ele',
            Address: 'ele',
            AverageMonthQuantity: 10,
            Salutation: 'ele',
            Designation: 'ele',
            PhoneNo: 'ele',
            AlternateNo: 'ele',
            Email: 'ele',
            Password: 'ele',
            AccountNo: 'ele',
            AccountType: 'ele',
            IFSCCode: 'ele'
          }
          this.exelList.push(data);
          tableData.push(data);
        })
      });

    }
    // do something with the new dates 
  }
  export() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    var fmt = "";
    wb.Sheets["Sheet1"]["F"] = fmt;

    /* save to file */
    XLSX.writeFile(wb, "SheetJS.xlsx");
  }
  backToResponseList() {
    this.isDetail = false;
    this.viewDetails = false;
    this.isaprrjt = false;
    this.ngOnInit();
  }
  backToHome() {
    this.router.navigate(['/']);
  }
  OpenTradeDetails(data: any) {
    this.selectedOrder = data;
    this.isDetail = true;
    this.viewDetails = false;;
    this.tradeService.GetSellerResponseAdmin(data.OrderId).subscribe((res: any) => {
      this.totalTradesResponse = res;
    })
  }
  viewTradeDetailsBySubtrade(data: any) {
     
    if (data.Status == 'Deleted') {
      if (data.Status == 'Deleted') {
        Swal.fire({
          title: 'Reason For Buyer Deletion',
          text: '"' + this.tradeList[data.srno - 1].DeleteReason + '"',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#34c38f',
          confirmButtonText: 'Ok!',
        }).then(result => {
          if (!result.isDismissed) {
          } else {
          }
        });
      }
    } else {
      this.viewDetails = true;
      this.isDetail = false;;
      this.buyerModel = data;
      this.tradeService.getTransporterDetailsbyIdForAdmin(data.TradeId).subscribe((res: any) => {
        this.tradeTransportDetails = res;
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        this.TotalSellQuantity = data.SellerQuantity;
        this.TradedQuantity = 0;
        this.tradeTransportDetails.forEach((ele: any, ind: number) => {
          if (ele.DeliveryStatus == 'Delivered') {
            this.TradedQuantity = this.TradedQuantity + ele.MaterialQuantity;
            this.RemainQuantity = this.TotalSellQuantity - this.TradedQuantity;
             
          }
          let data: any = {
            srno: ind + 1,
            Date: 'ele',
            Time: 'ele',
            OrderId: 'ele',
            TradeId: '' + ele.OrderId,
            Quality: 'ele',
            BuyerName: 'ele',
            BuyerLocation: 'ele',
            BuyerQuantity: 'ele',
            BuyerRate: 2,
            PaymentTerms: 'ele',
            SellerName: 'ele',
            SellerLocation: 'ele',
            SellerQuantity: 'ele',
            DeliveryTerms: ' ele',
            MaterialImage: 'ele',
            Status: 'ele',
            DispatchDate: this.datepipe.transform(ele.StartDate, 'dd/MM/yyyy'),
            Quantity: ele.MaterialQuantity,
            InvoiceAmount: ele.InvoiceAmount,
            InvoiceImage: ele.InvoiceImage,
            WeightSlip: ele.WeightSlip,
            VehicleNumber: ele.VehicleNo,
            TransporterContact: ele.DriverContact,
            DeliveryDate: this.datepipe.transform(ele.DeliveryDate, 'dd/MM/yyyy '),
            DeliveryWeightSlip: ele.DeliveryReceipt,
            PaymentDueDate: this.datepipe.transform(ele.DueDate, 'dd/MM/yyyy'),
            PaymentDate: this.datepipe.transform(ele.PaymentDate, 'dd/MM/yyyy'),
            UtrNo: ele.UtrNo,
            PaymentScreenshot: ele.PaymentImage,
            FirstName: 'ele',
            LastName: 'ele',
            location: 'ele',
            Role: 'ele',
            MaterialQuality: 'ele',
            KYCStatus: 'ele',
            companyName: 'ele',
            street: 'ele',
            DeliveryDue: 'ele',
            TradeValidity: 'ele',
            SellerResponse: 0,
            RejectedMessage: 'ele',
            Commision: 'ele',
            Name: 'ele',
            Address: 'ele',
            Location: 'strin',
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
            Date1: ele.CreatedDate,
          }
          tableData.push(data);
        })
      })
    }


  }

}

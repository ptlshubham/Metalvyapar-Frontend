import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { TradeService } from 'src/app/core/services/trade.service';
import * as XLSX from 'xlsx';
import { Table } from 'src/app/pages/tables/datatable/datatable.model';
import { DataTableService } from 'src/app/pages/tables/datatable/datatable.service';
import { tableData } from 'src/app/pages/tables/datatable/data';
import { SortEvent, dataTableSortableDirective } from 'src/app/pages/tables/datatable/datatable-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ls from 'localstorage-slim';
@Component({
  selector: 'app-seller-completed-trade',
  templateUrl: './seller-completed-trade.component.html',
  styleUrls: ['./seller-completed-trade.component.scss']
})
export class SellerCompletedTradeComponent implements OnInit {
  @ViewChild("table1")
  table!: ElementRef;
  masterList: any = [];
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  isDetail: boolean = false;
  viewDetails: boolean = false;
  selectedOrder: any = {};
  tradeTransportDetails: any = [];
  totalTradesResponse: any = [];
  buyerModel: any = {};
  tradeList: any = [];
  exelTable: any = [];
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  @ViewChild('imageViewer')
  viewer!: SellerCompletedTradeComponent;
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [
  
  ];
  multiMaterialImages: any = [];
  constructor(
    public service: DataTableService,
    private tradeService: TradeService,
    public datepipe: DatePipe,
    private tardingService: TradeService,
    private modalService: NgbModal,
  ) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'DataTables', active: true }
    ];
    this.masterList=[];
    this.tardingService.getAllTradeForSeller(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      this.masterList = res;
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      tableData.length = 0;
      this.masterList.forEach((ele: any, ind: number) => {
        ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
        let data: any = {
          srno: ind + 1,
          Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
          Date1: ele.CreatedDate,
          Time: this.datepipe.transform(ele.CreatedDate, 'h:mm:ss a'),
          OrderId:''+ ele.OrderId,
          TradeId: ele.SubOrderId,
          Quality: ele.BuyerQuality,
          BuyerName: ele.BuyerName,
          BuyerLocation: ele.BuyerCity + ',' + ele.BuyerState,
          BuyerQuantity: ele.BuyerQuantity,
          BuyerRate: ele.BuyerRate,
          PaymentTerms:''+ ele.PaymentDays,
          SellerName: ele.SellerName,
          SellerLocation: ele.SellerCity + ',' + ele.SellerState,
          SellerQuantity: ''+ele.SellerQuantity,
          DeliveryTerms:''+ ele.DeliveryTerms,
          MaterialImage: ele.MaterialImage,
          Status: ele.TradeStatus,
          //trade details
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
          //customers
          FirstName: 'string',
          LastName: 'string',
          location: 'string',
          Role: 'string',
          MaterialQuality: 'string',
          KYCStatus: 'string',
          companyName: 'string',
          street: 'string',

          PaymentDate: 'this.datepipe',
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
        }
        this.exelTable.push(data);
        tableData.push(data);
      })
    })

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
  backToTradeList() {
    this.isDetail = false;
  }
  backToResponseList() {
    this.isDetail = false;
    this.viewDetails = false;
    this.ngOnInit();
  }
  OpenTradeDetails(data: any) {
    this.selectedOrder = data;
    this.isDetail = true;
    this.viewDetails = false;;
    this.tradeService.GetSellerResponse(data.OrderId).subscribe((res: any) => {
      this.totalTradesResponse = res;
    })
  }
  viewTradeDetailsBySubtrade(data: any) {
    this.viewDetails = true;
    this.isDetail = false;
    this.buyerModel = data;
    this.tradeTransportDetails=[];
    this.tradeService.getTransporterDetailsbyIdForSeller(data.TradeId).subscribe((res: any) => {
      this.tradeTransportDetails = res;
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      tableData.length = 0;
      this.tradeTransportDetails.forEach((ele: any, ind: number) => {
        let data: any = {
          srno: ind + 1,
          Date: 'this.datepipe.transform',
          Time: 'this.datepipe.transform',
          OrderId: 'ele.OrderId',
          TradeId: ele.OrderId,
          Quality: 'ele.BuyerQuality',
          BuyerName: 'ele.BuyerName',
          BuyerLocation: 'ele.BuyerCity',
          BuyerQuantity: 'ele.BuyerQuantity',
          BuyerRate: 2,
          PaymentTerms: 'gfg',
          SellerName: 'ele.SellerName',
          SellerLocation: 'ele.SellerCity',
          SellerQuantity: 'ele.SellerQuantity',
          DeliveryTerms: ' ele.DeliveryTerms',
          MaterialImage: 'ele.MaterialImage',
          Status: 'ele.TradeStatus',
          //trade details
          DispatchDate: this.datepipe.transform(ele.StartDate, 'dd/MM/yyyy '),
          Quantity: ele.MaterialQuantity,
          InvoiceAmount: ele.InvoiceAmount,
          InvoiceImage: ele.InvoiceImage,
          WeightSlip: ele.WeightSlip,
          VehicleNumber: ele.VehicleNo,
          TransporterContact: ele.DriverContact,
          DeliveryDate: this.datepipe.transform(ele.DeliveryDate, 'dd/MM/yyyy '),
          DeliveryWeightSlip: ele.DeliveryReceipt,
          PaymentDueDate: this.datepipe.transform(ele.DueDate, 'dd/MM/yyyy'),
          UtrNo: ele.UtrNo,
          PaymentScreenshot: ele.PaymentImage,
          //customers
          FirstName: 'string',
          LastName: 'string',
          location: 'string',
          Role: 'string',
          MaterialQuality: 'string',
          KYCStatus: 'string',
          companyName: 'string',
          street: 'string',
          PaymentDate: 'this.datepipe',
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
        }
        tableData.push(data);
      })
    })
  }

}

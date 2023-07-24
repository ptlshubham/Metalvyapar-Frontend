import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortEvent, dataTableSortableDirective } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {
  @ViewChild("table1")
  table!: ElementRef;

  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$: Observable<number> | undefined;
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';
  selectedDateRange: any;
  selectedDates: any;
  type: any;
  isaprrjt: boolean = false;
  isrjct:boolean = false;
  isDetail: boolean = false;
  viewDetails: boolean = false;
  isCompleted: boolean = false;
  selectedOrder: any = {};
  tradeTransportDetails: any = [];
  totalTradesResponse: any = [];
  buyerModel: any = {};
  tradeList: any = []
  exelList: any = [];

  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  cancelMessage: any;

  @ViewChild('imageViewer')
  viewer!: MasterTableComponent;
  multiMaterialImages: any = [];
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];
  statusFlag:any;
  tempArray:any=[];
  constructor(
    public service: DataTableService,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private tradeService: TradeService,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private router:Router
  ) { 
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'DataTables', active: true }
    ];
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.statusFlag = res.status;
       
      this.dashboardService.getDashboardTradeList().subscribe((res: any) => {
        this.tradeList = res;
         
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        if(this.statusFlag !=undefined){
          this.tradeList.forEach((ele:any)=>{
            if(this.statusFlag==ele.TradeStatus){
             this.tempArray.push(ele);
            }
          })
          this.tempArray.forEach((ele: any, ind: number) => {
            ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
            let pd:any;
            if(ele.IsDeleted){
              pd='Deleted';
            }else{
              pd = ele.TradeStatus
            }
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
              Status: pd,
              RejectedMessage:ele.RejectedMessage,
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
              PaymentDate:this.datepipe.transform(ele.PaymentDate,'MM/dd/yyyy'),
              DeliveryDue:this.datepipe.transform(ele.DispatchDate,'MM/dd/yyyy'),
              TradeValidity:'ele',
              SellerResponse:0,
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
            this.exelList.push(data);
            if(data.PaymentDate ==null){
              data.PaymentDate='ele';
            }
            tableData.push(data);
          });
        }else{
          this.tradeList.forEach((ele: any, ind: number) => {
            ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
            let pd:any;
            if(ele.IsDeleted){
              pd='Deleted';
            }else{
              pd = ele.TradeStatus
            }
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
              Status: pd,
              RejectedMessage:ele.RejectedMessage,
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
              PaymentDate:this.datepipe.transform(ele.PaymentDate,'MM/dd/yyyy'),
              DeliveryDue:this.datepipe.transform(ele.DispatchDate,'MM/dd/yyyy'),
              TradeValidity:'ele',
              SellerResponse:0,
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
            this.exelList.push(data);
            if(data.PaymentDate ==null){
              data.PaymentDate='ele';
            }
            tableData.push(data);
          });
        }
      })
    })

   
  }
  OpenTrade(){
     
    if(this.statusFlag=='Accepted'){
      this.service.searchTerm=this.statusFlag;
    }
    else if(this.statusFlag =='Pending'){
      this.service.searchTerm=this.statusFlag;
    }
    else if(this.statusFlag=='Deleted'){
      this.service.searchTerm=this.statusFlag;
    }
    else if(this.statusFlag=='Completed'){
      this.service.searchTerm=this.statusFlag;
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
  backToTradeList() {
    this.isDetail = false;
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
            OrderId: ele.OrderId,
            TradeId: ele.SubOrderId,
            Quality: ele.BuyerQuality,
            BuyerName: ele.BuyerName,
            BuyerLocation: ele.BuyerCity + ',' + ele.BuyerState,
            BuyerQuantity: ele.BuyerQuantity,
            BuyerRate: ele.BuyerRate,
            PaymentTerms: ele.PaymentDays,
            SellerName: ele.SellerName,
            SellerLocation: ele.SellerCity + ',' + ele.SellerState,
            SellerQuantity: ele.SellerQuantity,
            DeliveryTerms: ele.DeliveryTerms,
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
            street: 'string'
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
    XLSX.writeFile(wb, "MasterTable.xlsx");
  }
  backToResponseList() {
    this.isDetail = false;
    this.viewDetails = false;
    this.isaprrjt = false;
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
     
    if(data.Status=='Deleted'){
      if(data.Status == 'Deleted'){
        Swal.fire({
          title: 'Reason For Buyer Deletion',
          text: '"'+this.tradeList[data.srno-1].DeleteReason+'"',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#34c38f',
          confirmButtonText: 'Ok!',
        }).then(result => {
          if (!result.isDismissed) {
            // this.deleteMail();
            // Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
          } else {
            // this.MaryModal(this.MaryDataModal);
          }
        });
      }
    }else{
      this.viewDetails = true;
      this.isDetail = false;
      this.buyerModel = data;
  
      this.tradeService.getTransporterDetailsbyIdForAdmin(data.TradeId).subscribe((res: any) => {
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
            BuyerRate: 'ele.BuyerRate',
            PaymentTerms: 'ele.PaymentDays',
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
            PaymentDate:this.datepipe.transform(ele.PaymentDate,'dd/MM/yyyy'),
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
            street: 'string'
          }
          tableData.push(data);
        })
      })
    }

   
  }

}

import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SortEvent, dataTableSortableDirective } from '../../tables/datatable/datatable-sortable.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { DatePipe } from '@angular/common';
import { Table } from '../../tables/datatable/datatable.model';
import { Observable } from 'rxjs/internal/Observable';
import { tableData } from '../../tables/datatable/data';
import { TradeService } from 'src/app/core/services/trade.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-quality-list',
  templateUrl: './top-quality-list.component.html',
  styleUrls: ['./top-quality-list.component.scss']
})
export class TopQualityListComponent implements OnInit {

 
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>; 
  buyerList:any=[];
  data:any;
 
  @ViewChild('imageViewer')
  viewer!: TopQualityListComponent;
  multiMaterialImages: any = [];
  fullscreen: boolean = false;
  imageIndex: number = 0;
  viewDetails:boolean = false;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];
  tradeTransportDetails:any=[];
  buyerModel: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: DataTableService,
    public datepipe: DatePipe,
    private router:Router,
    private tradeService:TradeService,
    private modalService: NgbModal,
  ) {
    
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((res: any) => {
        this.data = res.data;
        this.viewDetails=false;
        let te={
          data:this.data
        };
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        this.tradeService.getTradeOnQuality(te).subscribe((res:any)=>{
         res.forEach((ele: any, ind: number) => {
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
            Status: ele.TradeStratus,
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
            tableData.push(data);
          })
        })
      });

  }
  back(){
     
    this.router.navigate(['/']);
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
  backToResponseList() {
    this.viewDetails = false;
    this.ngOnInit();
  }

  viewTradeDetailsBySubtrade(data: any) {
    // if(data.Status=='Deleted'){
    //   if(data.Status == 'Deleted'){
    //     Swal.fire({
    //       title: 'Reason For Buyer Deletion',
    //       text: '"'+this.tradeList[data.srno-1].DeleteReason+'"',
    //       icon: 'info',
    //       showCancelButton: false,
    //       confirmButtonColor: '#34c38f',
    //       confirmButtonText: 'Ok!',
    //     }).then(result => {
    //       if (!result.isDismissed) {
    //         // this.deleteMail();
    //         // Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
    //       } else {
    //         // this.MaryModal(this.MaryDataModal);
    //       }
    //     });
    //   }
    // }else{
      this.viewDetails = true;
    
      this.buyerModel = data;
  
      this.tradeService.getTransporterDetailsbyIdForSellerAdmin(data.TradeId).subscribe((res: any) => {
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

   
  // }
}

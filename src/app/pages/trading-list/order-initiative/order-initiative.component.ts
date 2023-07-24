import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Table } from '../../tables/datatable/datatable.model';
import { Observable } from 'rxjs';
import { SortEvent, dataTableSortableDirective } from '../../tables/datatable/datatable-sortable.directive';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/core/models/customer.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TradeService } from 'src/app/core/services/trade.service';
import Swal from 'sweetalert2';
import { any } from 'underscore';

@Component({
  selector: 'app-order-initiative',
  templateUrl: './order-initiative.component.html',
  styleUrls: ['./order-initiative.component.scss']
})
export class OrderInitiativeComponent implements OnInit {
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';
  CommisionSummary: any = [];
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;
  validationForm!: FormGroup;
  openCustDetails: boolean = false;
  submitted = false;
  kyc: any = false;
  totalRecords = 0;
  startIndex = 1;
  endIndex = 5;
  page = 1;
  pageSize = 5;
  custData: any = {};
  typeOfUser: any;
  customerData: Customer[] = [];
  isOrder: boolean = false;
  customer!: Array<Customer>;
  public customerModel: Customer = new Customer;
  filter: any;
  subfilter: any = [];
  public customers: Customer[] = [];
  cancelMessage: any;
  SellerResponseSummary:any=[];

  @ViewChild('imageViewer')
  viewer!: OrderInitiativeComponent;
  multiMaterialImages: any = [];
  fullscreen: boolean = false;
  imageIndex: number = 0;
  selectedDates: any;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    public service: DataTableService,
    public datepipe: DatePipe,
    public tradingService: TradeService,
    private modalService: NgbModal,

  ) {
    this.dashboardService.getInitiatedOrderList().subscribe((res: any) => {
      this.CommisionSummary = res;
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      tableData.length = 0;
      this.CommisionSummary.forEach((ele: any, ind: any) => {
         
        ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
        let pd,sd;
        if(ele.Paymentdays==0){
           pd = 'Advance Payment';
        }else{
          pd = ele.Paymentdays;
        }
        if(ele.IsDeleted){
          sd='Deleted'
        }else if(ele.IsActive){
          sd = 'Active'
        }else{
          sd = 'Completed';
        }
        let data: any = {
          srno: ind + 1,
          Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
          Date1: ele.CreatedDate,
          Time: this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a'),
          OrderId: ''+ele.OrderId,
          TradeId: ele.SubOrderId,
          Quality: ele.BuyerQuality,
          BuyerName: ele.BuyerName,
          BuyerLocation: ele.city + ',' + ele.state,
          BuyerQuantity: ele.BuyerQuantity,
          BuyerRate: ele.BuyerRate,
          PaymentTerms: ''+pd,
          SellerResponse:''+ ele.TotalResponse,
          Status:sd,
          TradeValidity: this.datepipe.transform(ele.PaymentValidity, 'dd/MM/yyyy '),
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
          SellerName: 'ele',
          SellerLocation: 'ele',
          SellerQuantity: 'ele',
          DeliveryTerms: ' ele',
          MaterialImage: 'ele',
          PaymentDate:this.datepipe.transform(ele.PaymentDate,'MM/dd/yyyy'),
          DeliveryDue:'ele',
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
        if(data.Time==null){
          data.Time = 'ele';
        }
        if(data.PaymentDate==null){
          data.PaymentDate = 'ele';
        }
        if(data.TradeId==null){
          data.TradeId = 'ele';
        }
        tableData.push(data);
      })
      this.tables$ = this.service.tables$;
      this.total$ = this.service.total$;
    })
  }
  ngOnInit(): void {
  }
  /**
* Open center modal
* @param centerDataModal center modal data
*/
  centerModal(centerDataModal: any, imagesrc: any, tradeId: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.tradingService.getMaterialImageById(tradeId).subscribe((res: any) => {
      this.multiMaterialImages = res;
      this.multiMaterialImages.forEach((element: any) => {
        if (element.image) {
          this.images.push(this.url + '' + element.image);
        }
      });
    })
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }

  openSellerTradeResponse(data1: any) {
    if(data1.Status == 'Deleted'){
      Swal.fire({
        title: 'Reason For Buyer Deletion',
        text: '"'+this.CommisionSummary[data1.srno-1].DeleteReason+'"',
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
    }else{
      this.isOrder = true;
      let data = {
        OrderId: data1.OrderId
      }
      this.dashboardService.getOrderDetailList(data).subscribe((res: any) => {
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        this.SellerResponseSummary = res;
        res.forEach((ele: any, ind: any) => {
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          let pd:any;
          if(ele.IsDeleted){
            pd = 'Deleted'
          }else{
            pd = ele.TradeStatus;
          }
          let data: any = {
            srno: ind + 1,
            Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
            Date1: ele.CreatedDate,
            Time: this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a'),
            OrderId: ''+ele.OrderId,
            TradeId: ele.SubOrderId,
            Quality: ele.BuyerQuality,
            SellerName: ele.SellerCompanyName,
            SellerLocation: ele.city + ',' + ele.state,
            BuyerQuantity: ele.BuyerQuantity,
            BuyerRate: ele.BuyerRate,
            PaymentTerms: ele.Paymentdays,
            SellerQuantity:''+ ele.SellerQuantity,
            Status: pd,
            DeliveryTerms:''+ ele.DeliveryTerms,
            MaterialImage: ele.MaterialImage,
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
          tableData.push(data);
        })
        this.tables$ = this.service.tables$;
        this.total$ = this.service.total$;
      })
    }
  
  }
  openDeleteMsg(data:any){
    Swal.fire({
      title: 'Reason For Trade Deletion',
      text: '"'+this.SellerResponseSummary[data.srno-1].DeleteReason+'"',
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
  backToOrders() {
    this.isOrder = false;
    tableData.forEach((element, index) => {
      delete tableData[index];
    });
    tableData.length = 0;
    this.CommisionSummary.forEach((ele: any, ind: any) => {
      ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
      let pd,sd;
      if(ele.Paymentdays==0){
         pd = 'Advance Payment';
      }else{
        pd = ele.Paymentdays;
      }
      if(ele.IsDeleted){
        sd='Deleted'
      }else if(ele.IsActive){
        sd = 'Active'
      }else{
        sd = 'Completed';
      }
      let data: any = {
        srno: ind + 1,
        Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
        Date1: ele.CreatedDate,
        Time: this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a'),
        OrderId: ele.OrderId,
        TradeId: ele.SubOrderId,
        Quality: ele.BuyerQuality,
        BuyerName: ele.BuyerName,
        BuyerLocation: ele.city + ',' + ele.state,
        BuyerQuantity: ele.BuyerQuantity,
        BuyerRate: ele.BuyerRate,
        PaymentTerms: pd,
        SellerResponse: ele.TotalResponse,
        Status:sd,
        TradeValidity: this.datepipe.transform(ele.PaymentValidity, 'dd/MM/yyyy '),
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
      tableData.push(data);
    })
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;

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
  onSelectedDatesChange(newDates: any) {
    if (newDates.from != undefined && newDates.to != undefined) {
      this.dashboardService.getOlderOrderInitiated(newDates).subscribe((res: any) => {
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        tableData.length = 0;
        res.forEach((ele: any, ind: any) => {
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          ele.PaymentDays;
          let pd,sd;
          if(ele.Paymentdays==0){
             pd = 'Advance Payment';
          }else{
            pd = ele.Paymentdays;
          }
          if(ele.IsDeleted){
            sd='Deleted'
          }else if(ele.IsActive){
            sd = 'Active'
          }else{
            sd = 'Completed';
          }
          let data: any = {
            srno: ind + 1,
            Date: this.datepipe.transform(ele.CreatedDate, 'dd/MM/yyyy '),
            Date1: ele.CreatedDate,
            Time: this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a'),
            OrderId: ele.OrderId,
            TradeId: ele.SubOrderId,
            Quality: ele.BuyerQuality,
            BuyerName: ele.BuyerName,
            BuyerLocation: ele.city + ',' + ele.state,
            BuyerQuantity: ele.BuyerQuantity,
            BuyerRate: ele.BuyerRate,
            PaymentTerms: pd,
            Status:sd,
            SellerResponse: ele.TotalResponse,
            TradeValidity: this.datepipe.transform(ele.PaymentValidity, 'dd/MM/yyyy '),
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
          tableData.push(data);
        })
        this.tables$ = this.service.tables$;
        this.total$ = this.service.total$;
      });

    }
    // do something with the new dates 
  }

}

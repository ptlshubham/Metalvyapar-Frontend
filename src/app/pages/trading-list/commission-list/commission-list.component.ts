
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Table } from '../../tables/datatable/datatable.model';
import { Observable } from 'rxjs';
import { SortEvent, dataTableSortableDirective } from '../../tables/datatable/datatable-sortable.directive';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/core/models/customer.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import { DatePipe } from '@angular/common';
import { ImageViewerComponent } from 'ngx-image-viewer';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.scss']
})
export class CommissionListComponent implements OnInit {
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';
  CommisionSummary: any = [];
  @ViewChild('imageViewer')
  viewer!: CommissionListComponent;

  multiMaterialImages:any=[];

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
  customer!: Array<Customer>;

  fullscreen: boolean = false;
  imageIndex: number = 0;
  url: string = "https://api.metalvyapar.com";
  // url: string = "https://api.metalvyapar.com";

  images: Array<string> = [
    'https://procodestore.com/wp-content/uploads/2021/03/164508084_271381191136191_654097929788476286_n.jpg',
    'https://freemediatools.com/img/profile.jpg'
  ];
  public customerModel: Customer = new Customer;
  filter: any;
  subfilter: any = [];
  public customers: Customer[] = [];
  cancelMessage: any;
  data: any;
  tempArray: any = [];

  tradeTransportDetails:any=[];
  buyerModel: any = {};
  viewDetails:boolean=false;

  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    public service: DataTableService,
    public datepipe: DatePipe,
    private tradeService:TradeService,
    private modalService: NgbModal,
  ) {
   
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.CommisionSummary=[];
      this.tempArray=[];
      this.data = res.data;
      this.dashboardService.getCommisionSummaryList().subscribe((res: any) => {
        this.CommisionSummary = res;
        this.viewDetails=false;
        tableData.forEach((element, index) => {
          delete tableData[index];
        });
        if (this.data != undefined) {
          this.CommisionSummary.forEach((ele:any)=>{
            if(this.data==ele.BuyerName){
             this.tempArray.push(ele);
            }
          });
          this.tempArray.forEach((ele: any, ind: any) => {
            ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
            let data: any = {
              srno: ind + 1,
              Date: this.datepipe.transform(ele.CommisionDate, 'MM/dd/yyyy '),
              Date1: ele.CreatedDate,
              Time: this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a'),
              OrderId: '' + ele.OrderId,
              TradeId: ele.SubOrderId,
              Quality: ele.BuyerQuality,
              BuyerName: ele.BuyerName,
              BuyerLocation: ele.BuyerCity + ',' + ele.BuyerState,
              BuyerQuantity: '' + ele.BuyerQuantity,
              BuyerRate: ele.BuyerRate,
              PaymentTerms: '' + ele.PaymentDays,
              SellerName: ele.SellerName,
              SellerLocation: ele.SellerCity + ',' + ele.SellerState,
              SellerQuantity: '' + ele.SellerQuantity,
              DeliveryTerms: '' + ele.DeliveryTerms,
              MaterialImage: ele.MaterialImage,
              Status: ele.TradeStatus,
              Commision: ele.ComissionAmount,
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
              Role: 'string',
              MaterialQuality: 'string',
              KYCStatus: 'string',
              companyName: 'string',
              street: 'string',
              PaymentDate: this.datepipe.transform(ele.PaymentDate, 'MM/dd/yyyy'),
              DeliveryDue: 'ele',
              TradeValidity: 'ele',
              SellerResponse: 0,
              RejectedMessage: 'ele',
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
            if (data.PaymentDate == null) {
              data.PaymentDate = 'ele';
            }
            tableData.push(data);
          })

        }
        else{
          this.CommisionSummary.forEach((ele: any, ind: any) => {
            ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
            let data: any = {
              srno: ind + 1,
              Date: this.datepipe.transform(ele.CommisionDate, 'MM/dd/yyyy '),
              Date1: ele.CreatedDate,
              Time: this.datepipe.transform(ele.CommisionDate, 'h:mm:ss a'),
              OrderId: '' + ele.OrderId,
              TradeId: ele.SubOrderId,
              Quality: ele.BuyerQuality,
              BuyerName: ele.BuyerName,
              BuyerLocation: ele.BuyerCity + ',' + ele.BuyerState,
              BuyerQuantity: '' + ele.BuyerQuantity,
              BuyerRate: ele.BuyerRate,
              PaymentTerms: '' + ele.PaymentDays,
              SellerName: ele.SellerName,
              SellerLocation: ele.SellerCity + ',' + ele.SellerState,
              SellerQuantity: '' + ele.SellerQuantity,
              DeliveryTerms: '' + ele.DeliveryTerms,
              MaterialImage: ele.MaterialImage,
              Status: ele.TradeStatus,
              Commision: ele.ComissionAmount,
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
              Role: 'string',
              MaterialQuality: 'string',
              KYCStatus: 'string',
              companyName: 'string',
              street: 'string',
              PaymentDate: this.datepipe.transform(ele.PaymentDate, 'MM/dd/yyyy'),
              DeliveryDue: 'ele',
              TradeValidity: 'ele',
              SellerResponse: 0,
              RejectedMessage: 'ele',
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
            if (data.PaymentDate == null) {
              data.PaymentDate = 'ele';
            }
            tableData.push(data);
          })
        }
        this.tables$ = this.service.tables$;
        this.total$ = this.service.total$;
      })
    });
  }
  getCommisionSummary() {
    this.dashboardService.getCommisionSummaryList().subscribe((res: any) => {
      this.CommisionSummary = res;
    })
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

  backToResponseList() {
    this.viewDetails = false;
    this.ngOnInit();
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
  viewTradeDetailsBySubtrade(data: any) {
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
            BuyerRate: 2,
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
            street: 'string',
            Commision: 2,
            DeliveryDue: 'ele',
            TradeValidity: 'ele',
            SellerResponse: 0,
            RejectedMessage: 'ele',
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

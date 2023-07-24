import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { SortEvent, dataTableSortableDirective } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { Observable } from 'rxjs';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {

  @ViewChild('imageViewer')
  viewer!: ContactUsListComponent;

  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];

  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;

  kyclist:any=[];
  constructor(
    private dashboardService:DashboardService,
    public service: DataTableService,
    private modalService: NgbModal,
  ) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
   }

  ngOnInit(): void {
    this.getRejectedKYCList();
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
  getRejectedKYCList(){
    this.dashboardService.getRejectedKYCList().subscribe((res:any)=>{
      this.kyclist = res;
      tableData.forEach((element, index) => {
        delete tableData[index];
      });
      tableData.length = 0;
      this.kyclist.forEach((ele: any,ind:any) => {
        if (ele.KYCStatus == false) {
          // this.customerData.push(ele);
          ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
          let data: any = {
            OrderId: 'ele.OrderId',
            Seller_Order_Id: 'ele.SubOrderId',
            RejectMsg: ele.KYCRejectMsg ,
            Seller: 'ele.SellerName',
            Quality: ele.MaterialQuality,
            Buyer_Quantity: 'ele.BuyerQuantity',
            Seller_Quantity: 'ele.SellerQuantity',
            Rate: 100,
            Validity: 'ele.PaymentValidity',
            Delivery_Terms: 'ele.PaymentTerms',
            Total_response: 'ele.TotalResponse',
            srno: ind+1,
            Name: ele.CompanyName,
            Location: ele.city + ', ' + ele.state,
            Address: ele.street + ', ' + ele.city + ', ' + ele.state + ' ' + ele.pincode,
            AverageMonthQuantity: ele.AvgMonthTrade,
            Salutation: ele.Salutation,
            FirstName: ele.FirstName,
            LastName: ele.LastName,
            Designation: ele.Designation,
            PhoneNo: ele.Phone,
            AlternateNo: ele.CompanyContact,
            Email: ele.Email,
            Password: ele.Password+'',
            GSTNo: ele.GSTNo+'',
            PANNo: ele.PANCard+'',
            BankName: ele.BankName+'',
            AccountName: ele.AccHolderName+'',
            AccountNo: ele.BankAccNo+'',
            AccountType: ele.AccType+'',
            IFSCCode: ele.ISFCCode+'',
            BankBranch: ele.BranchName+'',
            CancelCheque: ele.CancelCheque+'',
            Role: ele.Role,
            Date: 'string',
            Time: 'string',
            TradeId: 'string',
            BuyerName: 'string',
            BuyerLocation: 'string',
            BuyerQuantity: 'string',
            BuyerRate: 10,
            PaymentTerms:'string',
            SellerName:'string',
            SellerLocation:'string',
            SellerQuantity:'string',
            DeliveryTerms:'string',
            DeliveryDue:'string',
            MaterialImage:'string',
            Status:'string',
            TradeValidity:'string',
            SellerResponse:0,
            PaymentDate:'string',
            RejectedMessage:'string',
            DispatchDate:'string',
            Quantity:10,
            InvoiceAmount:10,
            InvoiceImage:'string',
            WeightSlip:'string',
            VehicleNumber:'string',
            TransporterContact:'string',
            DeliveryDate:'string',
            DeliveryWeightSlip:'string',
            PaymentDueDate:'string',
            UtrNo:'string',
            PaymentScreenshot:'string',
            Commision:'string',
            CustomerName:'string',
            StartDate: 'string',
            EndDate: 'string',
            Remaining: 'string',
            IsActive:1
          }
          tableData.push(data);
        }
      });
    })
  }
  openRejectMsg(data:any){
    Swal.fire({
      title: 'Reason For KYC Rejection:',
      text: '"'+this.kyclist[data.srno-1].KYCRejectMsg+'"',
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

  centerModal(centerDataModal: any, imagesrc: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }

}

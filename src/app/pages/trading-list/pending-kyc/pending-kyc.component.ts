import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/core/models/customer.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { dataTableSortableDirective, SortEvent } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { DataTableService } from '../../tables/datatable/datatable.service';
import { tableData } from '../../tables/datatable/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-kyc',
  templateUrl: './pending-kyc.component.html',
  styleUrls: ['./pending-kyc.component.scss']
})
export class PendingKycComponent implements OnInit {
  @ViewChild('imageViewer')
  viewer!: PendingKycComponent;

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
  public customerModel: Customer = new Customer;
  filter: any;
  subfilter: any = [];
  public customers: Customer[] = [];
  cancelMessage: any = '';
  isDetails: boolean = false;
  dest: any;
  KycUid: any;
  @ViewChild('MaryDataModal')
  MaryDataModal!: ElementRef;
  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    private modalService: NgbModal,
    public service: DataTableService,
    public toastr: ToastrService
  ) {

  }


  ngOnInit() {
    this.openCustDetails = false;
    this.customers = [];
    this.customerData = [];
    tableData.forEach((element, index) => {
      delete tableData[index];
    });
    this.dashboardService.getAllUserList().subscribe((res: any) => {
      this.customers = res;
      this.typeOfUser = 'pendingKyc';
      this.activatedRoute.queryParams.subscribe((res: any) => {
        // this.typeOfUser = res.type;
        this.dest = res.from;
        this.KycUid = res.custId;
      });
      setTimeout(() => {
        if (this.typeOfUser == 'pendingKyc') {
          let ind = 1;
          tableData.forEach((element, index) => {
            delete tableData[index];
          });
          tableData.length = 0;
          this.customers.forEach((ele: any) => {
            if (ele.KYCStatus == false && ele.KYCRejectMsg == null) {
              this.customerData.push(ele);
              if( ele.Password ==null){
                ele.Password='';
              }
              if( ele.BankName ==null){
                ele.BankName='';
              }
              if( ele.AccHolderName ==null){
                ele.AccHolderName='';
              }
              if( ele.AccType ==null){
                ele.AccType='';
              }
              if( ele.BankAccNo ==null){
                ele.BankAccNo='';
              }
              if( ele.BranchName ==null){
                ele.BranchName='';
              }
              if( ele.CancelCheque ==null){
                ele.CancelCheque='';
              }
              if( ele.ISFCCode ==null){
                ele.ISFCCode='';
              }
              if( ele.ISFCCode ==null){
                ele.ISFCCode='';
              }
              ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
              let data: any = {
                OrderId: 'ele.OrderId',
                Seller_Order_Id: 'ele.SubOrderId',
                Buyer: 'ele.BuyerName',
                Seller: 'ele.SellerName',
                Quality: ele.MaterialQuality,
                Buyer_Quantity: 'ele.BuyerQuantity',
                Seller_Quantity: 'ele.SellerQuantity',
                Rate: 100,
                Validity: 'ele.PaymentValidity',
                Delivery_Terms: 'ele.PaymentTerms',
                Total_response: 'ele.TotalResponse',
                srno: ind++,
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
                Password: ele.Password,
                GSTNo: ele.GSTNo,
                PANNo: ele.PANCard,
                BankName: ele.BankName,
                AccountName: ele.AccHolderName,
                AccountNo: ele.BankAccNo,
                AccountType: ele.AccType,
                IFSCCode: ele.ISFCCode,
                BankBranch: ele.BranchName,
                CancelCheque: ele.CancelCheque,
                Role: ele.Role,

               
                Date: 'this.datepipe',
                Time:' this.datepipe',
                TradeId: 'ele.SubOrderId',
                BuyerName: 'ele.BuyerName',
                BuyerLocation: 'ele.BuyerCity',
                BuyerQuantity: 'bg' ,
                BuyerRate: 2,
                PaymentTerms: 'iuki',
                SellerName: 'ele.SellerName',
                SellerLocation: 'ele.SellerCity',
                SellerQuantity: 'dsa' ,
                DeliveryTerms: 'fedf' ,
                MaterialImage: 'ele.MaterialImage',
                Status: 'ele.TradeStatus',
                Commision: 2,
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
                location: 'string',
                MaterialQuality: 'string',
                KYCStatus: 'string',
                companyName: 'string',
                street: 'string',
                PaymentDate: 'this.datepipe',
                DeliveryDue: 'ele',
                TradeValidity: 'ele',
                SellerResponse: 0,
                RejectedMessage: 'ele',
                CustomerName: 'ele',
              }
              tableData.push(data);
            }
          });
          if (this.dest != undefined) {
            this.customerData.forEach((ele: any, ind: any) => {
              if (ele.Id == this.KycUid) {
                this.viewCustomerDetails(ind);
              }
            })
          }
        }
      }, 600);
      this.tables$ = this.service.tables$;
      this.total$ = this.service.total$;
    });
  }
  /**
* Open center modal
* @param centerDataModal center modal data
*/
  centerModal(centerDataModal: any, imagesrc: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
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
  backToCustomer() {
    this.openCustDetails = false;
  }
  viewCustomerDetails(data: number) {
    if (this.dest != undefined) {
      this.custData = this.customerData[data];
      this.customerModel = this.customerData[data];;
      this.kyc = this.customerData[data].KYCStatus;
      this.openCustDetails = true;
    } else {
      this.custData = this.customerData[data - 1];
      this.customerModel = this.customerData[data - 1];;
      this.kyc = this.customerData[data - 1].KYCStatus;
       
      this.openCustDetails = true;
    }
  }
  sendADocument() {
    this.customerModel
    this.dashboardService.sendEmailDocument(this.customerModel).subscribe((res: any) => {
      if (res == 'success') {
        this.toastr.success('Document sent successfully.', 'success', {
          timeOut: 3000,
        });
      }
    })
  }
  confirm() {
    Swal.fire({
      // title: 'Are you sure?',
      // text: 'If Verification is done then click on yes rather then cancel !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Accept!',
      cancelButtonText: 'Reject!'
    }).then(result => {
      if (!result.isDismissed) {
        // this.deleteMail();
        let data = {
          id: this.custData.uid
        }
        this.dashboardService.updateKycUser(data).subscribe((res: any) => {
          if (res == 'success') {
            Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
            this.openCustDetails = true;
            // this.router.navigateByUrl('/',{skipLocationChange: true }).then(() => {
            //   this.router.navigate(['trade-list/customer'], {
            //     queryParams: {
            //       type: 'pendingKyc'
            //     }
            //   });
            this.ngOnInit();
          } else {
            Swal.fire('Sorry!', 'Something went wrong please try again later.', 'success');

          }
        })
        // Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
      } else {
        this.MaryModal(this.MaryDataModal);
      }
    });
  }
  MaryModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  SendCancelMsg() {
    let data = {
      email: this.custData.Email,
      uid: this.custData.uid,
      msg: this.cancelMessage
    };
    this.dashboardService.sendCancelKYCMsg(data).subscribe((res: any) => {
      if (res == 'sucess') {
        // this.MaryDataModal.nativeElement.close;
        this.toastr.success('KYC rejected', 'success', {
          timeOut: 3000,
        });
        this.ngOnInit();
        this.openCustDetails = false;
      }
    })
  }

}

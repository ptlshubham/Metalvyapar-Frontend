import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import * as moment from 'moment';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  @ViewChild('imageViewer')
  viewer!: CustomerListComponent;

  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";

  images: Array<string> = [
    'https://procodestore.com/wp-content/uploads/2021/03/164508084_271381191136191_654097929788476286_n.jpg',
    'https://freemediatools.com/img/profile.jpg'
  ];
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
  customerData: any = [];
  customer!: Array<Customer>;
  public customerModel: Customer = new Customer;
  filter: any;
  subfilter: any = [];
  public customers: Customer[] = [];
  cancelMessage: any;
  isGeneral: boolean = false;
  @ViewChild('MaryDataModal')
  MaryDataModal!: ElementRef;
  dest: any;
  KycUid: any;
  subForm!: FormGroup;
  planTime: any = null;
  selectedPlan: string = '';
  subscriptionModel: any = {};
  currentDate: any;
  nextMonthDate: any;
  numberOfDays: any;
  nextYearDate: any;
  TenYearDate: any;
  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    private modalService: NgbModal,
    public service: DataTableService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.openCustDetails = false;
    this.customers = [];
    this.customerData = [];
    this.subForm = this.formBuilder.group({
      price: [0, [Validators.required, Validators.min(1)]],
    });

    tableData.forEach((element, index) => {
      delete tableData[index];
    });
    this.dashboardService.getAllUserList().subscribe((res: any) => {
      this.customers = res;

      this.activatedRoute.queryParams.subscribe((res: any) => {
        this.typeOfUser = res.type;
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
            if (ele.KYCStatus == false) {
              this.customerData.push(ele);
              ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
              let data: any = {
                Srno: 'ele',
                Date: 'ele',
                Time: 'ele',
                OrderId: 'ele',
                TradeId: 'ele',
                BuyerName: 'ele',
                BuyerLocation: 'ele',
                BuyerQuantity: 'ele',
                BuyerRate: 100,
                PaymentTerms: 'ele',
                SellerName: 'ele',
                SellerLocation: 'ele',
                SellerQuantity: 'ele',
                DeliveryTerms: 'ele',
                DeliveryDue: 'ele',
                PaymentDate: 'ele',
                Status: 'ele',
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
                Quality: ele.MaterialQuality,
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
                IsActive: ele.IsActive,
                IsSubscribe:ele.IsSubscribe
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
        } else if (this.typeOfUser == 'Buyer') {
          let ind = 1;
          tableData.forEach((element, index) => {
            delete tableData[index];
          });
          tableData.length = 0;
          this.customers.forEach((ele: any) => {
            if (ele.KYCStatus == true && ele.Role == 'Buyer') {
              ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
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
          })
        }
        else if (this.typeOfUser == undefined) {
          this.customerData = this.customers;
          this.isGeneral = true;
          tableData.forEach((element, index) => {
            delete tableData[index];
          });
          tableData.length = 0;
          let ind = 1;
          this.customers.forEach((ele: any) => {
            if (ele.KYCStatus == true) {
              ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
              this.customerData.push(ele);
              let data: any = {
                Srno: 'ele',
                Date: 'ele',
                Time: 'ele',
                OrderId: 'ele',
                TradeId: 'ele',
                BuyerName: 'ele',
                BuyerLocation: 'ele',
                BuyerQuantity: 'ele',
                BuyerRate: 100,
                PaymentTerms: 'ele',
                SellerName: 'ele',
                SellerLocation: 'ele',
                SellerQuantity: 'ele',
                DeliveryTerms: 'ele',
                DeliveryDue: 'ele',
                PaymentDate: 'ele',
                Status: 'ele',
                SellerResponse: 100,
                //customer
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
                Uid: ele.Id,
                Quality: ele.MaterialQuality,
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
                IsActive: ele.IsActive,
                IsSubscribe:ele.IsSubscribe
              }
              tableData.push(data);
            }
          })
        }
        else {
          tableData.forEach((element, index) => {
            delete tableData[index];
          });
          tableData.length = 0;
          let ind = 1;
          this.customers.forEach((ele: any) => {
            if (ele.KYCStatus == true && ele.Role == 'Seller') {
              ele.location = ele.street + ' ' + ele.city + ' ' + ele.state + ' ';
              this.customerData.push(ele);
              let data: any = {
                Srno: 'ele',
                Date: 'ele',
                Time: 'ele',
                OrderId: 'ele',
                TradeId: 'ele',
                BuyerName: 'ele',
                BuyerLocation: 'ele',
                BuyerQuantity: 'ele',
                BuyerRate: 100,
                PaymentTerms: 'ele',
                SellerName: 'ele',
                SellerLocation: 'ele',
                SellerQuantity: 'ele',
                DeliveryTerms: 'ele',
                DeliveryDue: 'ele',
                PaymentDate: 'ele',
                Status: 'ele',
                SellerResponse: 100,
                //customer
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
                Quality: ele.MaterialQuality,
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
                IsActive: ele.IsActive,
                IsSubscribe:ele.IsSubscribe
              }
              tableData.push(data);
            }
          })
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
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  backToCustomer() {
    // if(this.dest != undefined){
    this.openCustDetails = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['trade-list/customer'], {
        queryParams: {
          type: 'pendingKyc',
        },
      });
    });
    // }else{
    //   this.openCustDetails = false;
    // }
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
  changeUserState(data: number) {
    let de = {
      uid: this.customerData[data - 1].uid,
      status: this.customerData[data - 1].IsActive
    };
    this.dashboardService.chageUserState(de).subscribe((res: any) => {
      if (res == 'sucess') {

        if (de.status == 1) {
          this.toastr.error('User deactivated successfully', 'success', {
            timeOut: 3000,
          });
          this.ngOnInit();
        } else {
          this.toastr.success('User activated successfully', 'success', {
            timeOut: 3000,
          });
          this.ngOnInit();
        }
      }
    })
  }
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If Verification is done then click on yes rather then cancel !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Reject',
    }).then(result => {
      if (!result.isDismissed) {
        let data = {
          id: this.custData.uid
        }
        this.dashboardService.updateKycUser(data).subscribe((res: any) => {
          if (res == 'success') {
            Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
            this.openCustDetails = false;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['trade-list/customer'], {
                queryParams: {
                  type: 'pendingKyc'
                }
              });
            });
          } else {
            Swal.fire('Sorry!', 'Something went wrong please try again later.', 'success');
          }
        })
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
        this.toastr.success('KYC rejected', 'success', {
          timeOut: 3000,
        });
        this.ngOnInit();
        this.openCustDetails = false;
      }
    })
  }
  openMembershipDetails(smallDataModal: any, uid: any) {
    this.selectedPlan = '';
    this.subscriptionModel = {};
    this.subForm.markAsUntouched();

    this.subscriptionModel.uid = uid
    this.modalService.open(smallDataModal, { size: 'sm', windowClass: 'modal-holder', centered: true });
  }
  get f() { return this.subForm.controls; }

  public onChangePlan(event: any) {
    this.selectedPlan = event.target.value;

    if (this.selectedPlan == '1 Month') {
      this.currentDate = new Date();
      // Calculate next month date
      const nextMonth = moment(this.currentDate).add(1, 'months');
      this.nextMonthDate = nextMonth.toDate();
      // Get the total number of days in the next month
      this.numberOfDays = nextMonth.daysInMonth();
    }
    else if (this.selectedPlan == '1 Year') {
      this.currentDate = new Date();
      // Calculate next year date
      const nextYear = moment(this.currentDate).add(1, 'year');
      this.nextYearDate = nextYear.toDate();
      // Calculate the total number of days between current date and next year
      this.numberOfDays = nextYear.diff(this.currentDate, 'days');
    }
    else if (this.selectedPlan == 'Life Time') {
      let currentDate = new Date();
      let afterTenYearsDate = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());
      this.TenYearDate = afterTenYearsDate;
      this.numberOfDays = Math.floor((afterTenYearsDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    }
  }
  saveSubscriptionPlan() {
    this.subscriptionModel.startDate = new Date();
    this.subscriptionModel.remainingdays = this.numberOfDays;
    this.subscriptionModel.status = 'Activated';
    this.subscriptionModel.isactive = true;

    if (this.selectedPlan == '1 Month') {
      this.subscriptionModel.endDate = this.nextMonthDate;
    }
    else if (this.selectedPlan == '1 Year') {
      this.subscriptionModel.endDate = this.nextYearDate;
    }
    else if (this.selectedPlan == 'Life Time') {
      this.subscriptionModel.endDate = this.TenYearDate
    }
     
    this.dashboardService.saveSubscriptionDetails(this.subscriptionModel).subscribe((res: any) => {
      if (res == 'success') {
        this.toastr.success('Subscription has been started.', 'success', {
          timeOut: 3000,
        });
        this.modalService.dismissAll();
        this.ngOnInit();
      }
      else{
        this.toastr.warning('Please try again after sometime.', 'danger', {
          timeOut: 3000,
        });
        this.modalService.dismissAll();
      }
    })
  }
}

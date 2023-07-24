import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TradeService } from 'src/app/core/services/trade.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  validationForm!: FormGroup;
  @ViewChild("table1")
  table!: ElementRef;

  paymentOpen: boolean = false;
  openNewRequest: boolean = false;
  openActive: boolean = false;
  isAccept: boolean = false;
  isBuyerOpen: boolean = false;
  openPayment: boolean = false;
  isViewDetails: boolean = false;
  isSalerRes: boolean = false;
  OrderDetails: any = [];
  submitted = false;
  buyerTrade: any = [];
  buyerData: any = [];
  materialsImagesList: any = [];
  buyerModel: any = {};
  cancelMessage: any = null;
  tnc: any;
  dt = new Date().toDateString();
  tradeModel: any = {};
  reqQuality: any = '';
  payment_days: number = 0;
  paymentTerms = [
    { id: 1, name: 'Advance Payment' },
    { id: 2, name: 'After Delivery' }

  ];
  today: string = new Date().toISOString().split('T')[0];
  minDate: Moment;
  tnc1: any;
  qualityList: any = [];
  @ViewChild('imageViewer')
  viewer!: TradeComponent;
  fullscreen: boolean = false;
  @ViewChild('MaryDataModal')
  MaryDataModal!: ElementRef;
  @ViewChild('RejectDataModal')
  RejectDataModal!: ElementRef;
  imageIndex: number = 0;
  delData: any;
  rejectData: any;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [
  ];
  constructor(
    public formBuilder: FormBuilder,
    public tradeService: TradeService,
    public userService: UserProfileService,
    public toastr: ToastrService,
    public datepipe: DatePipe,
    private modalService: NgbModal,
  ) {
    this.getQualityData();
    const currentYear = moment().year();
    this.minDate = moment([currentYear - 1, 0, 1]);
  }

  ngOnInit(): void {
    this.getRequestList();
    this.validationForm = this.formBuilder.group({
      selectMaterial: ['', [Validators.required]],
      selectPayment: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(1)]],
      terms: [[Validators.required]],
      validity: []
    });
  }
  get f() { return this.validationForm.controls; }
  getQualityData() {
    let data = {
      buyerId:ls.get('UserId', { decrypt: true })
    }
     
    this.userService.getQualityListForBuyer(data).subscribe((res: any) => {
      this.qualityList = res[0].MaterialQuality.split(',');
       
    });
  }
  centerModal(centerDataModal: any, imagesrc: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  onSubmit() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.tradeModel.buyerId =ls.get('UserId', { decrypt: true });
      this.tradeModel.buyerName = ls.get('UserName', { decrypt: true });
      this.tradeModel.payment_validity = this.dt;
      this.tradeModel.tradeStatus = 'IDEAL';
      this.tradeModel.payment_days = this.payment_days;
      this.tradeModel.email = ls.get('Email', { decrypt: true });
      this.tradeService.newTraderequest(this.tradeModel).subscribe((res: any) => {
        if (res == 'success') {
          this.toastr.success('Trade request added successfully.', 'Success', {
            timeOut: 3000,
          });
          this.tradeModel.payment_days = 0;
          this.tradeModel = {};
          this.validationForm.markAsUntouched();
          this.dt = new Date().toDateString();
          this.getRequestList();
          window.location.reload();
        }
      })
    }
  }
  openActiveRequest() {
    this.openActive = true;
    this.openNewRequest = true;
    this.isBuyerOpen = true;
    this.isAccept = false;
    this.openPayment = false
    this.isViewDetails = false;
  }
  OpenOrderDetails(data: any) {
    this.OrderDetails = [];
    this.reqQuality = data.BuyerQuality;
    this.tradeService.GetSellerResponse(data.OrderId).subscribe((res: any) => {
      if (res.length > 0) {
        this.isSalerRes = true;
        res.forEach((element: any) => {
          element.location = element.city + ', ' + element.state;
          if (element.TradeStatus == 'Pending' && !element.IsDeleted) {
            this.OrderDetails.push(element);
          }
        })
      }
      else {
        this.viewTradeDetailsByTrade(data);
      }
    })
  }
  backToActiveTrade() {
    this.isSalerRes = false;
  }

  newTradeRequest() {
    this.getQualityData();
    this.openActive = false;
    this.openNewRequest = false;
    this.isBuyerOpen = false;
    this.isAccept = false;
    this.openPayment = false
    this.isViewDetails = false;
  }
  getRequestList() {
    this.buyerTrade = [];
    this.tradeService.getAllActiveTradingDatabyIdForBuyer(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      if (res.length == 0) {
        this.buyerData.length = 0;
      } else {
        this.buyerData = res;
        this.buyerTrade = [];
        this.buyerData.forEach((element: any) => {
          if (element.IsActive) {
            let time = new Date();
            let dt = new Date(element.CreatedDate);
            let newdttime = new Date(dt.getTime() + 10 * 60 * 1000);
            (newdttime >= time) ? element.isDelete = true : element.isDelete = false;
            this.buyerTrade.push(element);
          }
        })
        this.buyerData.forEach((element: any) => {
          element.location = element.city + ', ' + element.state;
        })
      }
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
  viewAcceptOrReject(data: any) {
    this.buyerModel = data;
    this.tradeService.getMaterialImageById(this.buyerModel.SubOrderId).subscribe((res: any) => {
      if (res.length > 0) {
        this.materialsImagesList = res;
      }
    })
    this.isAccept = true;
    this.isBuyerOpen = false;
    this.openPayment = false
    this.isViewDetails = false;
  }
  backToSummary() {
    this.isAccept = false;
    this.isBuyerOpen = true;
    this.openPayment = false;
    this.isViewDetails = false;
  }
  DeleteTrade(data: any) {
    this.delData = data;
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Delete!',
      cancelButtonText: 'Cancel!'
    }).then(result => {
      if (!result.isDismissed) {
        this.MaryModal(this.MaryDataModal);
      } else {
       
      }
    });
  }
  MaryModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  SendCancelMsg() {
    let data = {
      OrderId: this.delData.OrderId,
      msg: this.cancelMessage
    };
    this.tradeService.deleteBuyerTrade(data).subscribe((res: any) => {
      if (res == 'sucess') {
        this.toastr.warning('Trade deleted successfully.', 'Deleted', {
          timeOut: 3000,
        });
        this.getRequestList();
      } else {
        this.toastr.warning('Some error please try again later.', 'Try again', {
          timeOut: 3000,
        })
      } 
    })
   
   
  }
  acceptOrderAndPay() {
    this.isAccept = false;
    this.isBuyerOpen = false;
    this.openPayment = true;
    this.isViewDetails = false;
  }
  RejectModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  recjectTrade() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to reject a trade!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (!result.isDismissed) {
        this.RejectModal(this.RejectDataModal);
        // Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
      } else {

      }
    });
  }
  saveRejectedTradeMsg(){
    this.buyerModel
    let data = {
      RejectMessage: this.cancelMessage,
      SubOrderId: this.buyerModel.SubOrderId,
      BuyerId: this.buyerModel.BuyerId,
      SellerId: this.buyerModel.SellerId
    }
    this.tradeService.RejectTradeFromBuyer(data).subscribe((res: any) => {
      if (res == 'success') {
        Swal.fire('Successfully!', 'Reject trade has been Completed.', 'success');
        let data = {
          OrderId: this.buyerModel.OrderId
        };
        this.OpenOrderDetails(data);
        this.openActiveRequest();
      } else {
        Swal.fire('Successfully!', 'Something Went wrong please try again later.', 'success');
      }
    })
  }
  backToViewReject() {
    this.isAccept = true;
    this.isBuyerOpen = false;
    this.openPayment = false;
    this.isViewDetails = false;
  }
  viewTradeDetailsByTrade(data: any) {
    this.buyerModel = {};
    this.isAccept = false;
    this.isBuyerOpen = false;
    this.openPayment = false;
    this.isViewDetails = true;
    this.buyerModel = data;
  }

}

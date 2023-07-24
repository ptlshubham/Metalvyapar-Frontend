import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { SellerTradeService } from 'src/app/core/services/seller-trade.service';
import { TradeService } from 'src/app/core/services/trade.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-seller-trade',
  templateUrl: './seller-trade.component.html',
  styleUrls: ['./seller-trade.component.scss']
})
export class SellerTradeComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;
  isAccept: boolean = false;
  isPending: boolean = false;
  isActiveOpen: boolean = false;
  isOpenDetails: boolean = false;
  cancelMessage: any = null;
  sellerModel: any = {};
  public tradeModel: any = {};
  @ViewChild('fileInput') el!: ElementRef;
  @ViewChild('multiFileInput') el1!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  multiImageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  subActiveList: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  materialMultiImage: any = [];
  materialsImagesList: any = [];
  addMultiImg: any = [];
  val: number = 0;
  tnc: any;
  sellerTrade: any = [];
  sellerData: any = [];
  sellerActiveData: any = [];
  sellerTradeActive: any = [];
  delData: any
  @ViewChild('imageViewer')
  viewer!: SellerTradeComponent;
  @ViewChild('MaryDataModal')
  MaryDataModal!: ElementRef;
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];
  multiMaterialImages: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public sellerTradeService: SellerTradeService,
    public tradingService: TradeService,
    private apiService: ApiService,
    private router: Router,
    public toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this.isPending = true;
  }
  ngOnInit(): void {
    this.val++;
    this.tnc = false;
    this.imageUrl = "assets/images/file-upload-image.jpg";
    this.tradingService.newTradeReqForSeller().subscribe((res: any) => {
      this.sellerData = res;
      this.sellerTrade = [];
      this.sellerData.forEach((element: any) => {
        element.buyerLocation = element.street + ' ' + element.city + ' ' + element.state;
        this.sellerTrade.push(element);
      })
      this.getActiveRequestData();
    })
    this.validationForm = this.formBuilder.group({
      validity: ['', Validators.required],
      address: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      sellquantity: [0, [Validators.required, Validators.min(1)]],
      terms: [0, [Validators.required, Validators.min(1)]],
      diliveryterms: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(1)]],
      quality: ['', [Validators.required]],
      buyer: ['', [Validators.required]],
      materialImage: ['', [Validators.required]],
      payment_days: ['']
    });
  }
  get f() { return this.validationForm.controls; }
  checkQuantity() {
    if (this.tradeModel.sell_quantity > this.tradeModel.RemainingQuantity) {
      this.tradeModel.sell_quantity = 0;
      this.toastr.error('Sell quantity cannot exceed required quantity.', 'Error', {
        timeOut: 3000,
      });
    }
  }
  addServiceList() {
    this.val++;
    this.addMultiImg.push({ name: this.val, multiImageUrl: 'assets/images/file-upload-image.jpg' });
  }
  removeServiceList(val: any) {
    this.addMultiImg.splice(val, 1);
  }
  centerModal(centerDataModal: any, imagesrc: any, tradeId: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    if (tradeId != null) {
      this.tradingService.getMaterialImageById(tradeId).subscribe((res: any) => {
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

  acceptBuyerRequest() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.validationForm.invalid) {
      return;
    } else {
      let seller: any, name: any;
      seller = ls.get('UserId', { decrypt: true });
      name =ls.get('UserName', { decrypt: true });
      this.tradeModel.materialImage = this.materialImage;
      this.tradeModel.sellerId = seller;
      this.tradeModel.userId = ls.get('UserId', { decrypt: true });
      this.tradeModel.sellerName = name;
      this.tradeModel.materialMultiImage = this.materialMultiImage;
      this.tradeModel.email =ls.get('Email', { decrypt: true });
      this.tradingService.saveSellerTradeRequest(this.tradeModel).subscribe((res: any) => {
        if (res == 'success') {
          this.toastr.success('Trade request submitted.', 'Success', {
            timeOut: 3000,
          });
          this.isAccept = false;
          this.isPending = true;
          this.ngOnInit();
        }
      })
    }
  }
  getActiveRequestData() {
    this.sellerTradeActive = [];
    this.tradingService.getAllTradingDatabyIdForSeller(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      if (res.length == 0) {
        this.sellerActiveData.length = 0;
      } else {
        this.sellerActiveData = res;
        this.sellerActiveData.forEach((element: any) => {
          element.location = element.city + ', ' + element.state;
        })
        this.sellerActiveData.forEach((element: any) => {
           
          if (element.TradeStatus == 'Pending' && !element.IsDeleted) {
            let time = new Date();
            let dt = new Date(element.TradeCreateDate);
            let newdttime = new Date(dt.getTime() + 10 * 60 * 1000);
            (newdttime >= time) ? element.isDelete = true : element.isDelete = false;
            this.sellerTradeActive.push(element);
          }

        })
      }
    })
  }
  editAcceptOrder(val: any) {
     
    this.isAccept = true;
    this.isPending = false;
    this.isOpenDetails = false;
    this.isActiveOpen = false;
    this.tradeModel = val;
    this.tradeModel.loc = val.city + ',' + val.state;
    this.materialMultiImage = [];
    this.addMultiImg = [];
    this.validationForm.controls['quantity'].disable();
    this.validationForm.controls['quality'].disable();
    this.validationForm.controls['terms'].disable();
    this.validationForm.controls['rate'].disable();
    this.validationForm.controls['validity'].disable();
    this.validationForm.controls['buyer'].disable();
    this.validationForm.controls['address'].disable();
    this.validationForm.controls['payment_days'].disable();
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
        // Swal.fire('Successfully!', 'Verification has been Completed.', 'success');
      } else {

      }
    });
  }
  MaryModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  SendCancelMsg() {
    let data = {
      OrderId: this.delData.SubOrderId,
      msg: this.cancelMessage
    };
    this.tradingService.deleteSellerTrade(data).subscribe((res: any) => {
      if (res == 'sucess') {
        this.toastr.warning('Trade deleted.', 'Deleted', {
          timeOut: 3000,
        });
        this.getActiveRequestData();
      } else {
        this.toastr.warning('Some error please try again later.', 'Try again', {
          timeOut: 3000,
        })
      }
    })


  }
  backToSummary() {
    this.isAccept = false;
    this.isActiveOpen = false;
    this.isPending = true;
    this.isOpenDetails = false;
  }
  backToActive() {
    this.isAccept = false;
    this.isActiveOpen = true;
    this.isPending = false;
    this.isOpenDetails = false;
  }
  openPendingRequest() {
    this.isAccept = false;
    this.isPending = true;
    this.isActiveOpen = false;
    this.isOpenDetails = false;
  }
  openActiveRequestList() {
    this.isActiveOpen = true;
    this.isAccept = false;
    this.isPending = false;
    this.isOpenDetails = false;
  }
  viewActiveDetails(data: any) {
    this.materialsImagesList = [];
    this.subActiveList = true;
    this.sellerModel = data;
     
    this.tradingService.getMaterialImageById(this.sellerModel.SubOrderId).subscribe((res: any) => {
      if (res.length > 0) {
        this.materialsImagesList = res;
      }
    })
    this.sellerModel.buyname = this.sellerModel.BuyerFirstName + ' ' + this.sellerModel.BuyerLastName;
    this.isAccept = false;
    this.isPending = false;
    this.isActiveOpen = false;
    this.isOpenDetails = true;
  }
  backToDashboard() {
    this.router.navigate(['/landing/user-home']);
  }
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.sellerTradeService.uploadMaterialImage(formdata).subscribe((response) => {
          this.materialImage = response;
          this.editFile = false;
          this.removeUpload = true;
          this.toastr.success('Image uploaded successfully.', 'Success', {
            timeOut: 3000,
          });
        })
      }
    }
  }
  removeImageData() {
    this.imageUrl = "assets/images/file-upload-image.jpg";
    this.materialImage = '';
  }
  uploadMultiFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addMultiImg[ind].multiImageUrl = reader.result;
        // this.multiImageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);


        this.sellerTradeService.uploadMaterialMultiImage(formdata).subscribe((response) => {
          this.materialMultiImage.push(response);
          this.toastr.success('Image uploaded successfully.', 'Success', {
            timeOut: 3000,
          });
          this.editFile = false;
          this.removeUpload = true;
        })
      }
    }
  }
  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;

  }

}


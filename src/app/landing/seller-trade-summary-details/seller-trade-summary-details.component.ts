import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { TradeService } from 'src/app/core/services/trade.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-seller-trade-summary-details',
  templateUrl: './seller-trade-summary-details.component.html',
  styleUrls: ['./seller-trade-summary-details.component.scss']
})
export class SellerTradeSummaryDetailsComponent implements OnInit {
  @Input() seller: any;
  sellerModel: any = {};
  transportModel: any = [];
  validationForm!: FormGroup;
  submitted = false;
  transportDetails: any = [];
  addTransporter: any = [];
  imageArray: any = [];
  invoiceImageArray: any = [];
  val: number = 0;
  @ViewChild('fileInput') el!: ElementRef;
  @ViewChild('fileInput1') el1!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  invoiceImageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  weightSlip: any;
  invoiceSlip: any;
  materialsImagesList: any = [];
  validImg1: any;
  validImg2: any;
  tnc: boolean = false;
  bankDetails: any = {};
  newAddTransporter: any = {};
  @ViewChild('imageViewer')
  viewer!: SellerTradeSummaryDetailsComponent;
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [
    'https://procodestore.com/wp-content/uploads/2021/03/164508084_271381191136191_654097929788476286_n.jpg',
    'https://freemediatools.com/img/profile.jpg'
  ];
  constructor(
    public formBuilder: FormBuilder,
    private tradingService: TradeService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private userService: UserProfileService
  ) { }
  ngOnInit(): void {
    this.validImg1 = 0;
    this.validImg2 = 0;
    this.sellerModel = this.seller;
     
    this.sellerModel.buyerName = this.seller.BuyerFirstName + ' ' + this.seller.BuyerLastName;
    this.tradingService.getMaterialImageById(this.sellerModel.SubOrderId).subscribe((res: any) => {
      if (res.length > 0) {
        this.materialsImagesList = res;
      }
    })
    this.newAddTransporter = { transportVehicle: '', transporterContact: "", materialQuantity: '', invoiceAmount: '', imageUrl: 'assets/images/file-upload-image.jpg', invoiceImageUrl: 'assets/images/file-upload-image.jpg', tradeId: this.sellerModel.tradeId };
    this.addTransporter.push(this.newAddTransporter);
    // if (this.sellerModel.transportDetailsStatus == true) {
    this.tradingService.getTransporterDetailsbyIdForSeller(this.sellerModel.SubOrderId).subscribe((res: any) => {
      this.transportDetails = res;
    })
    // }
    this.validationForm = this.formBuilder.group({
      selectStatus: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      materialQuantity: [0, [Validators.required]],
      invoiceAmount: [0, [Validators.required]],
      contact: [0, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }
  get f() { return this.validationForm.controls; }
  addTransporterList(ind: any) {
    this.newAddTransporter = { transportVehicle: '', transporterContact: "", materialQuantity: '', invoiceAmount: '', imageUrl: 'assets/images/file-upload-image.jpg', invoiceImageUrl: 'assets/images/file-upload-image.jpg', tradeId: this.sellerModel.tradeId };
    this.addTransporter[ind + 1] = this.newAddTransporter;;
  }
  removeTransporterList(val: any) {
    this.addTransporter.splice(val, 1);
  }
  centerModal(centerDataModal: any, imagesrc: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  submitTransportData() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.transportModel = [];
      this.addTransporter
       
      this.addTransporter.forEach((element: any, index: any) => {
        this.transportModel.push({ remainQtySeller: this.transportDetails.remainQuntySeller, DeliveryTerms: this.sellerModel.DeliveryTerms, subOrderId: this.sellerModel.SubOrderId, transportVehicle: element.transportVehicle, transporterContact: element.transporterContact, materialQuantity: element.materialQuantity, invoiceAmount: element.invoiceAmount, tradeId: element.tradeId, deliveryStatus: 'Dispatched', transportImage: this.imageArray[index], invoiceImage: this.invoiceImageArray[index] })
      });
      this.transportModel.remainQtySeller = this.transportDetails.remainQuntySeller;
       
      this.tradingService.saveTransporterDetails(this.transportModel).subscribe((res: any) => {
        if (res == 'success') {
          this.toastr.success('Transport details added Successfully.', 'success', {
            timeOut: 3000,
          });
          location.reload();
        }
      })
    }
  }
  CheckQuantity(index: any) {
     
    let totalQty: number = 0;
    if (this.transportDetails.length > 0) {
      this.transportDetails.forEach((ele: any, ind: any) => {
        totalQty = totalQty + Number(ele.MaterialQuantity);
        if (ind + 1 == this.transportDetails.length) {
          totalQty = totalQty + this.addTransporter[index].materialQuantity;
          if (totalQty > this.sellerModel.SellerQuantity) {
            this.addTransporter[index].materialQuantity = 0;
            this.toastr.error('You cannot enter quantity more than required.', 'Please enter valid quantity', {
              timeOut: 3000,
            });
          } else {
            this.transportDetails.remainQuntySeller = this.sellerModel.SellerQuantity - totalQty;
          }
        }
      })
    }
    else {
      if(this.addTransporter[index].materialQuantity > this.sellerModel.SellerQuantity){
        this.addTransporter[index].materialQuantity = 0;
        this.toastr.error('You cannot enter quantity more than required.', 'Please enter valid quantity', {
          timeOut: 3000,
        });
      }else{
        this.transportDetails.remainQuntySeller = this.sellerModel.SellerQuantity - this.addTransporter[index].materialQuantity;
      }
     
    }

  }
  uploadFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.validImg1++;
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addTransporter[ind].imageUrl = reader.result;
        // this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.tradingService.uploadWeightSlipImage(formdata).subscribe((response) => {
          this.weightSlip = response;
          this.toastr.success('File has been uploaded', 'Success', { timeOut: 3000 });

          this.imageArray[ind] = this.weightSlip;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }

  removeRecentWeightImage(ind: any) {
    this.addTransporter[ind].imageUrl = "assets/images/file-upload-image.jpg";
    this.imageArray[ind] = '';
    // this.tradingService.removeRecentWeightImg(this.weightSlip).subscribe((res: any) => {
    //   this.toastr.success('Donner details removed Successfully', 'Removed', {
    //     timeOut: 3000,
    //   });
    // })
  }
  invoiceUploadFile(event: any, ind: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      // Check if file is an image or PDF
      if (file.type.includes('image') || file.type === 'application/pdf') {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.addTransporter[ind].invoiceImageUrl = reader.result;
          this.validImg2++;
          const fileBase64Path = reader.result;
          this.cardImageBase64 = fileBase64Path;
          const formdata = new FormData();
          formdata.append('file', file);
           
          this.tradingService.inoviceRecieptImage(formdata).subscribe((response) => {
            this.invoiceSlip = response;
            this.toastr.success('File has been uploaded', 'Success', { timeOut: 3000 });

            this.invoiceImageArray[ind] = this.invoiceSlip;
            this.editFile = false;
            this.removeUpload = true;
          });
        };
      } else {
        // Display error message for invalid file type
        this.toastr.error('Please upload an image or PDF file', 'Invalid File Type', { timeOut: 3000 });
      }
    }
  }

  removeImageData(ind: any) {
    this.addTransporter[ind].invoiceImageUrl = "assets/images/file-upload-image.jpg";
    this.invoiceImageArray[ind] = '';
  }
  openBillingDetails(centerDataModal: any) {
    this.userService.getUserDetail(this.sellerModel.BuyerId).subscribe((res: any) => {

      this.bankDetails.PANCard = res[0].PANCard;
      this.bankDetails.GSTNo = res[0].GSTNo;
      this.bankDetails.pincode = res[0].pincode;
      this.bankDetails.BankAccNo = res[0].BankAccNo;
      this.bankDetails.companyName = this.sellerModel.BuyerCompanyName;
      this.bankDetails.location = this.sellerModel.location;



    })
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }

}

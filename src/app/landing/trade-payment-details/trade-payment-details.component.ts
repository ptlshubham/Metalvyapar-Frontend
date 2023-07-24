import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { PaymentTradeService } from 'src/app/core/services/paymenttrade.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-trade-payment-details',
  templateUrl: './trade-payment-details.component.html',
  styleUrls: ['./trade-payment-details.component.scss']
})
export class TradePaymentDetailsComponent implements OnInit {
  @Input() PaymentDetails: any;
  buyerModel: any = {};

  validationForm!: FormGroup;
  submitted = false;
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  paymentSlip: any;
  customerModel: any = {};
  dueDate: any;
  tnc: any = false;
  @ViewChild('imageViewer')
  viewer!: TradePaymentDetailsComponent;
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
    private paymentTradeService: PaymentTradeService,
    private userService: UserProfileService,
    private modalService: NgbModal,
    private apiService: ApiService,
    public toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buyerModel = this.PaymentDetails;
    this.validationForm = this.formBuilder.group({
      utr: ['', [Validators.required]],
      materialImage: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }
  centerModal(centerDataModal: any, imagesrc: any) {
    this.images = [];
    this.images.push(this.url + '' + imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  savePaymentDetails() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.buyerModel.paymentImage = this.paymentSlip;
      this.buyerModel.BuyerName = ls.get('UserName', { decrypt: true });
      this.paymentTradeService.saveBuyerPaymentDetails(this.buyerModel).subscribe((res: any) => {
        if (res == 'success') {
          this.toastr.success('Payment details added successfully.', 'success', {
            timeOut: 3000,
          });
          this.router.navigate(["/landing/user-home"])

        }
      })

    }
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
        this.paymentTradeService.uploadPaymentSlipImage(formdata).subscribe((response) => {
          this.paymentSlip = response;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }
  removeImageData() {
    this.imageUrl = "assets/images/file-upload-image.jpg";
    this.paymentSlip = '';
  }
  openBankDetails(centerDataModal: any) {
    this.userService.getUserDetail(this.buyerModel.SellerId).subscribe((res: any) => {
      this.customerModel = res[0];
      this.customerModel.forEach((element: any) => {
        element.sellerLocation = element.street + ' ' + element.city + ' ' + element.state;
      })
    })
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
}

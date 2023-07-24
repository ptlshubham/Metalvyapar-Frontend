import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/core/models/customer.model';
import { TradeService } from 'src/app/core/services/trade.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;

  @Input() public customerDetails: Customer | any;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  // public customer: Customer[] = [];
  dateString = '2012-11-01';
  dateString1 = '2018-10-01';
  disabled: boolean = true;
  cityListData: any = [];
  cityData: any = [];
  selectedCity: any;
  stateData: any = [];
  selectedState: any;
  multiDefaultOption: any = '';
  Default: any = [

  ];
  tradeList: any = [];
  tradeDetails: any = [];
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;

  @ViewChild('imageViewer')
  viewer!: CustomerDetailsComponent;

  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [];

  constructor(
    public formBuilder: FormBuilder,
    public tradeService: TradeService,
    private userservice: UserProfileService,
    public router: Router,
    public toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this.getQualityData();
  }

  ngOnInit(): void {
    this.getTradingHistory();
    this.selectedCity = this.customerDetails.city;
    this.selectedState = this.customerDetails.state;
    this.customerDetails.AccType = 'current';
    this.customerDetails.newAccNo = this.customerDetails.BankAccNo;
    this.customerDetails.confirmAccNo = this.customerDetails.BankAccNo;
    
    let ab = this.customerDetails.MaterialQuality.split(',');
    this.multiDefaultOption = ab;
    this.imageUrl = 'https://api.metalvyapar.com' + this.customerDetails.CancelCheque;
    if (this.imageUrl != undefined || this.imageUrl != null) {
      this.imageUrl = 'assets/images/file-upload-image.jpg';
    }
    this.validationForm = this.formBuilder.group({
      select: [{ value: '' }, [Validators.required]],
      regAs: [{ value: '' }, [Validators.required]],
      fname: [{ value: '' }, [Validators.required]],
      lname: [{ value: '' }, [Validators.required]],
      contact: [{ value: '' }, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [{ value: '' }, [Validators.required, Validators.email]],
      companyname: [{ value: '' }, [Validators.required]],
      designation: [{ value: '' }, [Validators.required]],
      gstno: [{ value: '' }, [Validators.required]],
      pancard: [{ value: '' }, [Validators.required]],
      workphone: [{ value: '' }, [Validators.required, Validators.min(1)]],
      address: [{ value: '' }, [Validators.required]],
      city: [{ value: '' }, [Validators.required]],
      selectState: [{ value: '' }, [Validators.required]],
      landmark: [{ value: '' }],
      multiDefaultOption: [{ value: '' }, [Validators.required]],
      pincode: [{ value: '' }, [Validators.required, Validators.min(6)]],
      avg_mnth_trade: [{ value: '' }, [Validators.required, Validators.min(1)]],
      selectAcc: [{ value: '', disabled: true }, [Validators.required]],
      acHolder: [{ value: '' }, [Validators.required]],
      bankName: [{ value: '' }, [Validators.required]],
      newAccNo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      confirmAccNo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      branchName: [{ value: '' }, [Validators.required]],
      ISFC: [{ value: '' }, [Validators.required]],
      cancelCheque: [{ value: '' }, [Validators.required]]

    }, {
      validators: this.ConfirmedValidator('newAccNo', 'confirmAccNo')
    });
    this.imageUrl = this.customerDetails.CancelCheque;
    this.getStateList();

  }
  getQualityData() {
    this.Default = [];
    this.userservice.getQualityListJson().subscribe((res: any) => {
      const newFirstElement = 'Select All'
      this.Default = [newFirstElement].concat(res)
    })
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

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.validationForm.valid) {
      this.userservice.completeProfile(this.customerDetails).subscribe((res: any) => {
        if (res == 'success') {
          this.toastr.success('Data has been saved.', 'Success', {
            timeOut: 3000,
          });
          if (this.router.url == "/trade-list/customer") {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['trade-list/customer']);
            });
          } else {
            this.router.navigate(['trade-list/pending-kyc'], {
              queryParams: {
                type: 'pendingKyc',
                from: 'update',
                custId: this.customerDetails.uid
              },

            });
          }
        } else {
          this.toastr.error('Something went wrong! try after sometime.', 'Try again.', {
            timeOut: 3000,
          });
        }
      })
    }
    else {
      this.toastr.error('Please Fill Details Properly.', 'Something is Missing.', {
        timeOut: 3000,
      });
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
        this.userservice.uploadCancelCheckImage(formdata).subscribe((response) => {
          this.materialImage = response;
          this.toastr.success('Image has been uploaded.', 'Success', {
            timeOut: 3000,
          });
          this.customerDetails.CancelCheque = this.materialImage;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
    }
  }
  removeImage() {
    this.imageUrl = "assets/images/file-upload-image.jpg";
    this.materialImage = '';
  }
  selectQty(val: any) {
    if (val[0] == 'Select All') {
      this.multiDefaultOption = ['HR-CR (Low Carbon)', 'HR-CR (High Carbon)', 'Melting', 'Piece to piece', 'Turning', 'Turning Bundle'];
      // this.Default.forEach((ele: any) => {
      //   if (ele.name != 'Select All') {
      //     this.multiDefaultOption.push(element);
      //   }
      // })
    }

  }
  getTradingHistory() {
    if (this.customerDetails != undefined) {
      if (this.customerDetails.Role == 'Buyer') {
        this.tradeService.GetAllTradesByUseridForBuyer(this.customerDetails.uid).subscribe((res: any) => {
          this.tradeList = res;
        })
      } else {
        this.tradeService.getAllTradingDatabyIdForAdminSeller(this.customerDetails.uid).subscribe((res: any) => {
          this.tradeList = res;
        })
      }
    }
  }
  editAcceptOrder(data: any) {
    this.tradeService.getAllTradingDatabyIdForBuyer(data.orderId).subscribe((res: any) => {
      this.tradeDetails = res;
    })
  }
  getStateList() {
    this.userservice.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
      this.selectedState = this.customerDetails.state;
      this.getCityListAccordingState();

    })
  }
  getCityListAccordingState() {
    this.cityListData = [];
    this.userservice.getCityFromJson().subscribe((res: any) => {
      this.cityData = res;
      this.cityData.forEach((element: any) => {
        if (element.state == this.selectedState) {
          this.selectedCity = this.customerDetails.city;
          this.cityListData.push(element);
        }
      });
    })
  }
  selectCityData(e: any): void {
    this.selectedCity = e.target.value
    this.selectedCity = this.customerDetails.city;

  }

}

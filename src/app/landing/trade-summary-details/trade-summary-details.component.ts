import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-trade-summary-details',
  templateUrl: './trade-summary-details.component.html',
  styleUrls: ['./trade-summary-details.component.scss']
})
export class TradeSummaryDetailsComponent implements OnInit {
  @Input() buyer: any;
  buyerModel: any = {};
  validationForm!: FormGroup;
  submitted = false;
  transportDetails: any = [];

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  deliveryReciept: any;
  deliveryDetails: any = [];
  recieptData: any = {};
  materialsImagesList:any=[];
  @ViewChild('imageViewer')
  viewer!: TradeSummaryDetailsComponent;
  fullscreen: boolean = false;
  imageIndex: number = 0;
  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [
    'https://procodestore.com/wp-content/uploads/2021/03/164508084_271381191136191_654097929788476286_n.jpg',
    'https://freemediatools.com/img/profile.jpg'
  ];
  constructor(
    private tradingService: TradeService,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    public toastr: ToastrService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.buyerModel = this.buyer;
    this.tradingService.getMaterialImageById(this.buyerModel.SubOrderId).subscribe((res: any) => {
      if (res.length > 0) {
        this.materialsImagesList = res;
      }
    })
    this.validationForm = this.formBuilder.group({
      selectStatus: ['', [Validators.required]],
    });
    this.getTransporterDetails();
  }
  get f() { return this.validationForm.controls; }
  getTransporterDetails() {
    this.tradingService.getTransporterDetailsbyIdForSeller(this.buyerModel.SubOrderId).subscribe((res: any) => {
      this.transportDetails = res;
      this.transportDetails.forEach((element: any) => {
        element.imageUrl = 'assets/images/file-upload-image.jpg';
      })
    })
  }
  onChangeStatus(data:any,ind:any){
    this.transportDetails[ind].DeliveryStatus = data.value;
  }
  saveDeliveryReciept(data: any) {
    this.submitted = true;
    var dt:any = new Date();
    dt.setDate(dt.getDate() + this.buyerModel.PaymentDays);
    dt = dt.getUTCFullYear() + '-' +
        ('00' + (dt.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + dt.getUTCDate()).slice(-2) + ' ' + 
        ('00' + dt.getUTCHours()).slice(-2) + ':' + 
        ('00' + dt.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + dt.getUTCSeconds()).slice(-2);
    if (this.validationForm.invalid) {
       
      return;
    } else {
      this.recieptData.Id = data.Id,
        this.recieptData.DeliveryReceipt = data.deliveryReceipt,
        this.recieptData.DeliveryStatus = data.DeliveryStatus;
      this.recieptData.OrderId = data.OrderId;
      this.recieptData.DueDate = dt;
      this.recieptData.PaymentDays = this.buyerModel.PaymentDays;
       
      this.tradingService.SaveDeliveryRecieptData(this.recieptData).subscribe((res: any) => {
         
        if (res == 'success') {
          this.toastr.success('Delivery details added successfully.', 'success', {
            timeOut: 3000,
          });
          this.ngOnInit();
        }
      })

    }
  }
  centerModal(centerDataModal: any,imagesrc:any) {
    this.images = [];
    this.images.push(this.url+''+imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  uploadFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        // this.imageUrl = reader.result;
        this.transportDetails[ind].imageUrl = reader.result;
        // this.deliveryDetails[ind]
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.tradingService.uploadDeliveryRecieptImage(formdata).subscribe((response) => {
          this.deliveryReciept = response;
          this.transportDetails[ind].deliveryReceipt = this.deliveryReciept;
          this.toastr.success('Delivery Reciept uploaded successfully.', 'success', {
            timeOut: 3000,
          });
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
    this.deliveryReciept = '';
  }
}

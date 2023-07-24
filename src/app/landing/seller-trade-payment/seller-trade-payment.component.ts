import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ls from 'localstorage-slim';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-seller-trade-payment',
  templateUrl: './seller-trade-payment.component.html',
  styleUrls: ['./seller-trade-payment.component.scss']
})
export class SellerTradePaymentComponent implements OnInit {
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  openBilling: boolean = false;
  openTransport: boolean = false;
  openDetails: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  sellerPaymentDetails: any = {};
  sellerData: any = [];
  sellerTrade: any = [];
  transportDetails: any = [];
  transport: any = [];
  upcomingPaymentId: any = null;
  constructor(
    private tradingService: TradeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.openBilling = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.upcomingPaymentId = params['id'];
    });
  }

  ngOnInit(): void {
    this.tradingService.getBillTradingDataForSeller(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      if (res.length == 0) {
        this.sellerData.length = 0;
      } else {
        this.sellerData = res;
        this.sellerTrade = res;
        this.sellerTrade.forEach((element: any) => {
          element.BuyerName = element.BuyerFirstName + ' ' + element.BuyerLastName;
          element.location = element.street + ' ' + element.city + ' ' + element.state;
        })

      }
    })
    if(this.upcomingPaymentId!=null){
      this.tradingService.getTransporterDetailsbyIdForSeller(this.upcomingPaymentId).subscribe((res: any) => {
        this.transportDetails = res;
        
      })
      this.openDetails = false;
      this.openBilling = false;
      this.openTransport = true;
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


        // this.sellerTradeService.uploadMaterialImage(formdata).subscribe((response) => {
        //   this.materialImage = response;
        //   this.editFile = false;
        //   this.removeUpload = true;
        // })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;

  }
  viewTransportDetails(data: any) {
    this.transportDetails = data;
      
    this.tradingService.getTransporterDetailsbyIdForSeller(data).subscribe((res: any) => {
      this.transportDetails = res;
    })
    this.openDetails = false;
    this.openBilling = false;
    this.openTransport = true;

  }
  viewPaymentDetails(data: any) {
     
    this.transport = [];
    this.sellerTrade.forEach((element: any) => {
      if (element.OrderId == data.OrderId) {
        this.transport.push({ Quality: this.sellerTrade[0].BuyerQuality, CompanyName: element.CompanyName, tradeId: element.OrderId, buyerName: element.BuyerName, buyerLocation: element.location, quality: element.BuyerQuality, quantity: element.SellerQuantity, rate: element.BuyerRate, dispachdate: data.StartDate, dilveredDate: data.EndDate, driverContact: data.DriverContact, vehicleNo: data.VehicleNo, weightSlip: data.WeightSlip, invoiceImage: data.InvoiceImage, materialQuantity: data.MaterialQuantity, invoiceAmount: data.InvoiceAmount, deliveryStatus: data.DeliveryStatus, deliveryReceipt: data.DeliveryReceipt, utrNo: data.UtrNo, paymentImage: data.PaymentImage, paymentDate: data.PaymentDate, dueDate: data.DueDate });
      }

    })
    this.sellerPaymentDetails = this.transport[0]
    this.openDetails = true;
    this.openBilling = false;
    this.openTransport = false;

  }
  backToSummary() {
    this.openBilling = false;
    this.openDetails = false;
    this.openTransport = true;

  }
  backToBilling() {
    this.openBilling = true;
    this.openDetails = false;
    this.openTransport = false;

  }

}

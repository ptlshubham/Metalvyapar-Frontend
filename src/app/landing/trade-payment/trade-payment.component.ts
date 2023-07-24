import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ls from 'localstorage-slim';
import { TradeService } from 'src/app/core/services/trade.service';

@Component({
  selector: 'app-trade-payment',
  templateUrl: './trade-payment.component.html',
  styleUrls: ['./trade-payment.component.scss']
})
export class TradePaymentComponent implements OnInit {
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  openBilling: boolean = false;
  openDelivery: boolean = false;
  openDetails: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  buyerPaymentDetails: any = {};
  buyerData: any = [];
  buyerTrade: any = [];
  transportDetails: any = [];
  transport: any = [];
  TransportList: any = [];
  buytradeindex: any;
  upcomingPaymentsId: any= null;
  constructor(
    private tradingService: TradeService,
    private activatedRoute: ActivatedRoute

  ) {
    this.openBilling = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.upcomingPaymentsId = params['id'];
    });
  }

  ngOnInit(): void {
    this.tradingService.getBillTradingDataForBuyer(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      if (res.length == 0) {
        this.buyerData.length = 0;
      } else {
        this.buyerTrade = [];
        this.buyerData = res;
        this.buyerTrade = res;
         
      }
    })
    if(this.upcomingPaymentsId!=null){
      this.buyerData.forEach((element:any) => {
        
      });
    }
  }


  viewTransportDetails(data: any, ind: any) {
    this.buytradeindex = ind;
    this.transportDetails = data.TrasnportDetail;
    this.transportDetails.forEach((element: any) => {
      element.SellerCompanyName = this.buyerData[this.buytradeindex].sellerCompanyName;
    })
     
    this.openDetails = false;
    this.openBilling = false;
    this.openDelivery = true;

  }
  viewPaymentDetails(data: any, ind: any) {
     
    this.transport = [];
    this.transport.push({
      OrderId: data.OrderId, SellerId: data.SellerId,
      SellerName: data.SellerName,
      SellerLocation: data.street + ' ,' + data.city + '-' + data.pincode + ',' + data.state,
      BuyerQuality: this.buyerData[this.buytradeindex].BuyerQuality,
      SellerQuantity: data.SellerQuantity,
      SellerCompanyName: this.buyerData[this.buytradeindex].sellerCompanyName,
      Rate: data.BuyerRate,
      TransportId: data.TransportId,
      Dispachdate: data.StartDate,
      DilveredDate: data.EndDate,
      DriverContact: data.DriverContact,
      VehicleNo: data.VehicleNo,
      WeightSlip: data.WeightSlip,
      InvoiceImage: data.InvoiceImage,
      MaterialQuantity: data.MaterialQuantity,
      InvoiceAmount: data.InvoiceAmount,
      DeliveryStatus: data.DeliveryStatus,
      DeliveryReceipt: data.DeliveryReceipt,
      UtrNo: data.UtrNo,
      PaymentImage: data.PaymentImage,
      PaymentDate: data.PaymentDate,
      DueDate: data.DueDate
    });
    this.buyerPaymentDetails = this.transport[0];
    this.openDetails = true;
    this.openBilling = false;
    this.openDelivery = false;

  }
  backToSummary() {
    this.openBilling = false;
    this.openDetails = false;
    this.openDelivery = true;

  }
  backToBilling() {
    this.openBilling = true;
    this.openDetails = false;
    this.openDelivery = false;

  }
}

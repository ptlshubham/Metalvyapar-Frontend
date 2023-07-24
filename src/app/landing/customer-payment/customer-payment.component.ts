import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { TradeService } from 'src/app/core/services/trade.service';
@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.scss']
})
export class CustomerPaymentComponent implements OnInit {
  @Input() buyer: any;
  @Input() seller: any;
  comRate: number = 100;
  comTotal: number = 0;
  withoutTax: number = 0;
  tax: number = 18;
  GSTAmount: number = 0;
  GST: number = 18;
  finalTotal: number = 0;
  constructor(
    private tradingService: TradeService,
    private router: Router,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.comTotal = this.comRate * this.buyer.SellerQuantity;
    // this.withoutTax = +this.comTotal - (+this.comTotal * +this.tax / 100);
    this.GSTAmount = (+this.comTotal * +this.GST / 100);
    this.finalTotal = this.comTotal + this.GSTAmount;
    this.buyer.TotalCommision = this.finalTotal;
  }
  tradeComissionPayment() {
    if (this.buyer != undefined) {
      this.buyer.BuyerEmail =  ls.get('Email', { decrypt: true });
      this.buyer.CompanyName = ls.get('UserName', { decrypt: true });
      this.tradingService.comissionPaymentForBuyer(this.buyer).subscribe((res: any) => {
        if (res == 'success') {
          this.router.navigate(['/landing/user-home']);
          this.toastr.success('Payment Completed Successfully.', 'success', {
            timeOut: 3000,
          });
        }
      })
    }
    else {
      this.tradingService.comissionPaymentForSeller(this.seller).subscribe((res: any) => {
        if (res == 'success') {
          this.router.navigate(['/landing/user-home']);
          this.toastr.success('Payment Completed Successfully.', 'success', {
            timeOut: 3000,
          });
        }
      })
    }
  }
}

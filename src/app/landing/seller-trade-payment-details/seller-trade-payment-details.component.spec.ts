import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTradePaymentDetailsComponent } from './seller-trade-payment-details.component';

describe('SellerTradePaymentDetailsComponent', () => {
  let component: SellerTradePaymentDetailsComponent;
  let fixture: ComponentFixture<SellerTradePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerTradePaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTradePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

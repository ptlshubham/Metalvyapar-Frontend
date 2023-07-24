import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTradePaymentComponent } from './seller-trade-payment.component';

describe('SellerTradePaymentComponent', () => {
  let component: SellerTradePaymentComponent;
  let fixture: ComponentFixture<SellerTradePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerTradePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTradePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

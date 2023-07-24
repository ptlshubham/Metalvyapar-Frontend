import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePaymentDetailsComponent } from './trade-payment-details.component';

describe('TradePaymentDetailsComponent', () => {
  let component: TradePaymentDetailsComponent;
  let fixture: ComponentFixture<TradePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradePaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

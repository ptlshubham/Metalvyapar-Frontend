import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePaymentComponent } from './trade-payment.component';

describe('TradePaymentComponent', () => {
  let component: TradePaymentComponent;
  let fixture: ComponentFixture<TradePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

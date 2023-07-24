import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCompletedTradeComponent } from './buyer-completed-trade.component';

describe('BuyerCompletedTradeComponent', () => {
  let component: BuyerCompletedTradeComponent;
  let fixture: ComponentFixture<BuyerCompletedTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerCompletedTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerCompletedTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

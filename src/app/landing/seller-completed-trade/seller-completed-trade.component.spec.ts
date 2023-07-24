import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCompletedTradeComponent } from './seller-completed-trade.component';

describe('SellerCompletedTradeComponent', () => {
  let component: SellerCompletedTradeComponent;
  let fixture: ComponentFixture<SellerCompletedTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerCompletedTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCompletedTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

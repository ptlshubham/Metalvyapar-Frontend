import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTradeComponent } from './seller-trade.component';

describe('SellerTradeComponent', () => {
  let component: SellerTradeComponent;
  let fixture: ComponentFixture<SellerTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

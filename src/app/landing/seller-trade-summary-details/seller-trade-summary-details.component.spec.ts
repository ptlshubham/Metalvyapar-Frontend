import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTradeSummaryDetailsComponent } from './seller-trade-summary-details.component';

describe('SellerTradeSummaryDetailsComponent', () => {
  let component: SellerTradeSummaryDetailsComponent;
  let fixture: ComponentFixture<SellerTradeSummaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerTradeSummaryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTradeSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

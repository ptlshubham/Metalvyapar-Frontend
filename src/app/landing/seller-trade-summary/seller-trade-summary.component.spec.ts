import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTradeSummaryComponent } from './seller-trade-summary.component';

describe('SellerTradeSummaryComponent', () => {
  let component: SellerTradeSummaryComponent;
  let fixture: ComponentFixture<SellerTradeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerTradeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTradeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

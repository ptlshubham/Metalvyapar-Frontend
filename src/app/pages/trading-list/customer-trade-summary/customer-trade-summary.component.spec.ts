import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTradeSummaryComponent } from './customer-trade-summary.component';

describe('CustomerTradeSummaryComponent', () => {
  let component: CustomerTradeSummaryComponent;
  let fixture: ComponentFixture<CustomerTradeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTradeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTradeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

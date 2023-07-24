import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSummaryDetailsComponent } from './trade-summary-details.component';

describe('TradeSummaryDetailsComponent', () => {
  let component: TradeSummaryDetailsComponent;
  let fixture: ComponentFixture<TradeSummaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeSummaryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

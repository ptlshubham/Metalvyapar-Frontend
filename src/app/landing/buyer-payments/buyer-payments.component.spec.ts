import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPaymentsComponent } from './buyer-payments.component';

describe('BuyerPaymentsComponent', () => {
  let component: BuyerPaymentsComponent;
  let fixture: ComponentFixture<BuyerPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

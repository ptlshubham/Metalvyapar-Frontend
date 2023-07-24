import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDeliveriesComponent } from './buyer-deliveries.component';

describe('BuyerDeliveriesComponent', () => {
  let component: BuyerDeliveriesComponent;
  let fixture: ComponentFixture<BuyerDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerDeliveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

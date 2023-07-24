import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInitiativeComponent } from './order-initiative.component';

describe('OrderInitiativeComponent', () => {
  let component: OrderInitiativeComponent;
  let fixture: ComponentFixture<OrderInitiativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInitiativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

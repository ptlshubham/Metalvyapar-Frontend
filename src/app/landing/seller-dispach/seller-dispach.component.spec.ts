import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDispachComponent } from './seller-dispach.component';

describe('SellerDispachComponent', () => {
  let component: SellerDispachComponent;
  let fixture: ComponentFixture<SellerDispachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDispachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDispachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

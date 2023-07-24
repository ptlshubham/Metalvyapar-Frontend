import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingKycComponent } from './pending-kyc.component';

describe('PendingKycComponent', () => {
  let component: PendingKycComponent;
  let fixture: ComponentFixture<PendingKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

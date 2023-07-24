import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceInboxComponent } from './grievance-inbox.component';

describe('GrievanceInboxComponent', () => {
  let component: GrievanceInboxComponent;
  let fixture: ComponentFixture<GrievanceInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievanceInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievanceInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

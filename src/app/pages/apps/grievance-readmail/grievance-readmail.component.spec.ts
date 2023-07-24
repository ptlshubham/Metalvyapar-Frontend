import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceReadmailComponent } from './grievance-readmail.component';

describe('GrievanceReadmailComponent', () => {
  let component: GrievanceReadmailComponent;
  let fixture: ComponentFixture<GrievanceReadmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievanceReadmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievanceReadmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

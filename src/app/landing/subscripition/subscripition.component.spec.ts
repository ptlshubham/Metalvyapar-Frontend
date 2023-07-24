import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscripitionComponent } from './subscripition.component';

describe('SubscripitionComponent', () => {
  let component: SubscripitionComponent;
  let fixture: ComponentFixture<SubscripitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscripitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscripitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopQualityListComponent } from './top-quality-list.component';

describe('TopQualityListComponent', () => {
  let component: TopQualityListComponent;
  let fixture: ComponentFixture<TopQualityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopQualityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopQualityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

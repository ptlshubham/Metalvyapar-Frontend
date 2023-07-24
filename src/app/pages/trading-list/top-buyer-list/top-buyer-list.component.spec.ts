import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBuyerListComponent } from './top-buyer-list.component';

describe('TopBuyerListComponent', () => {
  let component: TopBuyerListComponent;
  let fixture: ComponentFixture<TopBuyerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBuyerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBuyerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

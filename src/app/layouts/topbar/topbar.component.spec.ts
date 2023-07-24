import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarComponent ],
      imports:[RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        
       ],
        schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

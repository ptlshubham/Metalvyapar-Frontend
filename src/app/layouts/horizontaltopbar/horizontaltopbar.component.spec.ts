import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontaltopbarComponent } from './horizontaltopbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('HorizontaltopbarComponent', () => {
  let component: HorizontaltopbarComponent;
  let fixture: ComponentFixture<HorizontaltopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontaltopbarComponent ],
      imports: [RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontaltopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

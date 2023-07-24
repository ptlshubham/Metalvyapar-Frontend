import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpwdComponent } from './recoverpwd.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

describe('RecoverpwdComponent', () => {
  let component: RecoverpwdComponent;
  let fixture: ComponentFixture<RecoverpwdComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverpwdComponent ],
      imports: [RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, 
      ],
      providers: [
        {provide: ToastrService, useClass: ToastrService}
      ]
    })
    .compileComponents();
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should use ValueService', () => {
  //   service = TestBed.inject(ToastrService);
  //   // expect(service.()).toBe('real value');
  // });
});

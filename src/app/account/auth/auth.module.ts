import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmmailComponent } from './confirmmail/confirmmail.component';
import { VerificationComponent } from './verification/verification.component';
import { TwostepverificationComponent } from './twostepverification/twostepverification.component';
import { ExtrapagesModule } from 'src/app/extrapages/extrapages.module';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverpwdComponent,
    LockscreenComponent,
    LogoutComponent,
    ConfirmmailComponent,
    VerificationComponent,
    TwostepverificationComponent,
    ForgotpwdComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    NgbCarouselModule,
    ExtrapagesModule
  ]
})
export class AuthModule { }

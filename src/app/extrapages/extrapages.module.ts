import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { ExtrapagesRoutingModule } from './extrapages-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from '../layouts/layouts.module';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { HeaderRightComponent } from './header-right/header-right.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ArchwizardModule } from 'angular-archwizard';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    MaintenanceComponent,
    Page404Component,
    Page500Component,
    ContactComponent,
    HeaderComponent,
    HeaderMainComponent,
    HeaderRightComponent,
    FooterMainComponent,
    UserRegisterComponent,
    ProductSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ExtrapagesRoutingModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbNavModule,
    NgSelectModule,
    SimplebarAngularModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    ArchwizardModule,
    FeatherModule.pick(allIcons),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ],
  exports:[
    HeaderComponent,
    HeaderMainComponent,
    HeaderRightComponent,
    FooterMainComponent
  ]
})
export class ExtrapagesModule { }

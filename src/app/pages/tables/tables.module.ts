import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { TablesRoutingModule } from './tables-routing.module';
import { BasicComponent } from './basic/basic.component';
import { DatatableComponent } from './datatable/datatable.component';
import { dataTableSortableDirective } from './datatable/datatable-sortable.directive';
import { DecimalPipe } from '@angular/common';
@NgModule({
  declarations: [
    BasicComponent,
    DatatableComponent,
    dataTableSortableDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TablesRoutingModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ],
  exports:[
    dataTableSortableDirective,
    DatatableComponent
  ],
  providers:[
    DecimalPipe
  ]
})
export class TablesModule { }

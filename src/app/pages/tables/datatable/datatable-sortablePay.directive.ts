import { Directive, EventEmitter, Input, Output } from '@angular/core';
import {  TablePayment } from './datatable.model';

export type SortColumnPay = keyof TablePayment | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEventPayment {
  column: SortColumnPay;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortablepay]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class SortablePayDirective {

  constructor() {
    
   }

  @Input() sortablepay: SortColumnPay = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEventPayment>();
 
  rotate() {
     
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortablepay, direction: this.direction });
  }
}

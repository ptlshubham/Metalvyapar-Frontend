import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { dataTableSortableDirective, SortEvent } from 'src/app/pages/tables/datatable/datatable-sortable.directive';
import { Table } from 'src/app/pages/tables/datatable/datatable.model';
import { DataTableService } from 'src/app/pages/tables/datatable/datatable.service';

@Component({
  selector: 'app-seller-payments',
  templateUrl: './seller-payments.component.html',
  styleUrls: ['./seller-payments.component.scss']
})
export class SellerPaymentsComponent implements OnInit {
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;

  constructor(
    public service: DataTableService,

  ) { }

  ngOnInit(): void {
  }
 /**
  * Sort table data
  * @param param0 sort the column
  *
  */
 onSort({ column, direction }: SortEvent) {
   
  // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });
  this.service.sortColumn = column;
  this.service.sortDirection = direction;
}

}

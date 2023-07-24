import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/models/customer.model';
import { dataTableSortableDirective, SortEvent } from '../../tables/datatable/datatable-sortable.directive';
import { Table } from '../../tables/datatable/datatable.model';
import { DataTableService } from '../../tables/datatable/datatable.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
  providers: [DataTableService, DecimalPipe]

})
export class SellerListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  tableData!: Table[];
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  constructor(
    public service: DataTableService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this._fetchData();
  }
  _fetchData() {
    this.tableData = this.tableData;
  }
  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column , direction }: SortEvent) {
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

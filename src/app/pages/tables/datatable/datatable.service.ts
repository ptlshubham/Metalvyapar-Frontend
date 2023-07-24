import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { Table,TablePayment } from './datatable.model';
import {  tableData } from './data';
import { SortDirection, SortColumn } from './datatable-sortable.directive';

interface SearchResult {
    tables: Table[];
    total: number;
}


interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
    searchTermPay:string;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

/**
 * Sort the table data
 * @param Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: Table[], column: SortColumn, direction: string): Table[] {
    if (direction === '' || column === '') {
        return tables;
    } else {
        return [...tables].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}
/**
 * Sort the table data
 * @param TablePayment field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */


/**
 * Table Data Match with Search input
 * @param  Table field value fetch
 * @param term Search the value
 */
function matches(table: Table, term: string, pipe: PipeTransform) {
    
    return pipe.transform(table.srno).includes(term) || table.Date.toLowerCase().includes(term.toLowerCase())
            || table.OrderId.toLowerCase().includes(term.toLowerCase())
            || table.Time.toLowerCase().includes(term.toLowerCase())
            || table.TradeId.toLowerCase().includes(term.toLowerCase())
            || table.Quality.toLowerCase().includes(term.toLowerCase())
            || table.BuyerName.toLowerCase().includes(term.toLowerCase())
            || table.BuyerLocation.toLowerCase().includes(term.toLowerCase())
            || table.BuyerQuantity.toLowerCase().includes(term.toLowerCase())
            || pipe.transform(table.BuyerRate).includes(term)
            || table.PaymentTerms.toLowerCase().includes(term.toLowerCase())
            || table.SellerName.toLowerCase().includes(term.toLowerCase())
            || table.SellerLocation.toLowerCase().includes(term.toLowerCase())
            || table.SellerQuantity.toLowerCase().includes(term.toLowerCase())
            || table.DeliveryTerms.toLowerCase().includes(term.toLowerCase())
            || table.DeliveryDue.toLowerCase().includes(term.toLowerCase())
            || table.PaymentDate.toLowerCase().includes(term.toLowerCase())
            || table.Status.toLowerCase().includes(term.toLowerCase())
            || pipe.transform(table.SellerResponse).includes(term.toLowerCase())
            //customer
            || table.Name.toLowerCase().includes(term.toLowerCase())
            || table.Address.toLowerCase().includes(term.toLowerCase())
            || table.Location.toLowerCase().includes(term.toLowerCase())
            || pipe.transform(table.AverageMonthQuantity).includes(term.toLowerCase())
            || table.Salutation.toLowerCase().includes(term.toLowerCase())
            || table.FirstName.toLowerCase().includes(term.toLowerCase())
            || table.LastName.toLowerCase().includes(term.toLowerCase())
            || table.Designation.toLowerCase().includes(term.toLowerCase())
            || table.PhoneNo.toLowerCase().includes(term.toLowerCase())
            || table.AlternateNo.toLowerCase().includes(term.toLowerCase())
            || table.Email.toLowerCase().includes(term.toLowerCase())
            || table.Password.toLowerCase().includes(term.toLowerCase())
            || table.GSTNo.toLowerCase().includes(term.toLowerCase())
            || table.PANNo.toLowerCase().includes(term.toLowerCase())
            || table.BankName.toLowerCase().includes(term.toLowerCase())
            || table.AccountName.toLowerCase().includes(term.toLowerCase())
            || table.AccountNo.toLowerCase().includes(term.toLowerCase())
            || table.AccountType.toLowerCase().includes(term.toLowerCase())
            || table.IFSCCode.toLowerCase().includes(term.toLowerCase())
            || table.BankBranch.toLowerCase().includes(term.toLowerCase())
            || table.CancelCheque.toLowerCase().includes(term.toLowerCase())
            // || table.CustomerName.toLowerCase().includes(term.toLowerCase())
            || table.Role.toLowerCase().includes(term.toLowerCase())
            || table.DispatchDate.toLowerCase().includes(term.toLowerCase())
            || pipe.transform(table.Quantity).includes(term.toLowerCase())
            || pipe.transform(table.InvoiceAmount).includes(term)
            || table.InvoiceImage.toLowerCase().includes(term.toLowerCase())
            || table.WeightSlip.toLowerCase().includes(term.toLowerCase())
            || table.VehicleNumber.toLowerCase().includes(term.toLowerCase())
            || table.TransporterContact.toLowerCase().includes(term.toLowerCase())
            || table.DeliveryWeightSlip.toLowerCase().includes(term.toLowerCase())
            || table.PaymentDueDate.toLowerCase().includes(term.toLowerCase())
            || table.UtrNo.toLowerCase().includes(term.toLowerCase())
            || table.PaymentScreenshot.toLowerCase().includes(term.toLowerCase())

}



@Injectable({
    providedIn: 'root'
})

export class DataTableService {
    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);

    private _loadingPayment$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    private _searchPayment$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _tables$ = new BehaviorSubject<Table[]>([]);
    // tslint:disable-next-line: variable-name
    private _tablePayment$ = new BehaviorSubject<TablePayment[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private _totalPayment$ = new BehaviorSubject<number>(0);
    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        searchTermPay:'',
        sortColumn: '',
        sortDirection: '',
        startIndex: 0,
        endIndex: 9,
        totalRecords: 0,
    };


    constructor(private pipe: DecimalPipe) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            
            this._tables$.next(result.tables);
            this._total$.next(result.total);
        });
        this._search$.next();

       
    }

    /**
     * Returns the value
     */
    get tables$() { return this._tables$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }

    get tablePayment$() { return this._tablePayment$.asObservable(); }
    get totalPayment$() { return this._totalPayment$.asObservable(); }
    get loadingPayment$() { return this._loadingPayment$.asObservable(); }

    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    get searchTermPay() { return this._state.searchTermPay; }

    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    /**
     * set the value
     */
    // tslint:disable-next-line: adjacent-overload-signatures
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set searchTermPay(searchTermPay: string) { this._set({ searchTermPay }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
   

    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
        this._searchPayment$.next();
    }

    /**
     * Search Method
     */
    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let tables = sort(tableData, sortColumn, sortDirection);

        // 2. filter
        tables = tables.filter(table => matches(table, searchTerm, this.pipe));
        const total = tables.length;

        // 3. paginate
        this.totalRecords = tables.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);
        return of(
            { tables, total }
        );
    }

}

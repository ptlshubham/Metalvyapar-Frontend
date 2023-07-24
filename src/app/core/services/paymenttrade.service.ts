import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentTradeService {
    constructor(
        private http: HttpClient
    ) { }

    uploadPaymentSlipImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadPaymentSlipImageURL, img);
    }
    saveBuyerPaymentDetails(data: any) {
        return this.http.post(ApiService.saveBuyerPaymentDetailsURL, data);
    }

}
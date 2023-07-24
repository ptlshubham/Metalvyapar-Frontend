import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SellerTradeService {

  constructor(
    private httpClient: HttpClient
  ) { }
 
  uploadMaterialImage(img:any): Observable<any>{
    return this.httpClient.post<any>(ApiService.uploadMaterialImageURL, img);

  }
  uploadMaterialMultiImage(img:any): Observable<any>{
    return this.httpClient.post<any>(ApiService.uploadMaterialMultiImageURL, img);
  }
}



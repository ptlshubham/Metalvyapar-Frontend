import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import ls from 'localstorage-slim';

@Injectable({ providedIn: 'root' })
export class TradeService {
    constructor(
        private http: HttpClient
    ) { }


    newTraderequest(data: any) {
        return this.http.post(ApiService.newTradeRequestURL, data);
    }

    saveSellerTradeRequest(data: any) {
         
        return this.http.post(ApiService.saveSellerTradeRequestURL, data);
    }

    getAllTradingDatabyIdForSeller(id: any) {
        let data = {
            uid: id
        };
        return this.http.post(ApiService.getAllTradingDatabyIdForSellerURL, data);
    }
    getAllTradingDatabyIdForAdminSeller(id: any) {
        let data = {
            uid: id
        };
        return this.http.post(ApiService.getAllTradingDatabyIdForSellerAdminURL, data);
    }
    GetSellerResponse(id: any) {
        let data = {
            orderId: id
        };
        return this.http.post(ApiService.getAllSellerResponseURL, data);
    }
    GetSellerResponseAdmin(id: any) {
        let data = {
            orderId: id
        };
        return this.http.post(ApiService.getAllSellerResponseAdminURL, data);
    }


    getAllTradingDatabyIdForBuyer(id: any) {
        let data = {
            uid: id
        };
         
        return this.http.post(ApiService.getAllTradingDatabyIdForBuyerURL, data);
    }
    getAllActiveTradingDatabyIdForBuyer(id: any) {
        let data = {
            uid: id
        };
        return this.http.post(ApiService.getAllActiveTradingDatabyIdForBuyerURL, data);
    }
    RejectTradeFromBuyer(data: any) {
        return this.http.post(ApiService.rejectTradeFromBuyerURL, data);
    }
    newTradeReqForSeller() {
        let data = {
           mat_qlty: ls.get('material_quality', { decrypt: true })
        };
         
        return this.http.post(ApiService.getNewTradingReqForSellerURL, data);
    }
    comissionPaymentForBuyer(data: any) {
        return this.http.post(ApiService.newComissionPaymentForBuyerURL, data);

    }
    comissionPaymentForSeller(data: any) {
        return this.http.post(ApiService.newComissionPaymentForSellerURL, data);

    }
    uploadWeightSlipImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadWeightSlipImageURL, img);

    }
    removeRecentWeightImg(id: any): Observable<any> {
        return this.http.get(ApiService.removeRecentWeightImgURL + id);

    }
    inoviceRecieptImage(img: any): Observable<any> {
         
        return this.http.post<any>(ApiService.invoiceRecieptImageUploadURL, img);

    }
    uploadDeliveryRecieptImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadDeliveryRecieptImageURL, img);

    }
    saveTransporterDetails(data: any) {

        return this.http.post(ApiService.saveTransporterDetailsURL, data);
    }
    getTransporterDetailsbyIdForSeller(id: any) {
        let data = {
            tradeId: id
        };
        return this.http.post(ApiService.getTransporterDetailsbyIdForSellerURL, data);
    }
    getTransporterDetailsbyIdForSellerAdmin(id: any) {
        let data = {
            tradeId: id
        };
        return this.http.post(ApiService.getTransporterDetailsbyIdForSellerAdminURL, data);
    }
    getTransporterDetailsbyIdForAdmin(id: any) {
        let data = {
            tradeId: id
        };
        return this.http.post(ApiService.getTransporterDetailsbyIdForAdminURL, data);
    }

    getMaterialImageById(id: any) {
        return this.http.get(ApiService.getMaterialsImagesURL + id);
    }
    deleteBuyerTrade(data:any){
        return this.http.post(ApiService.deleteBuyerTradeURL,data);
    }
    deleteSellerTrade(data:any){
        return this.http.post(ApiService.deleteSellerTradeURL,data);
    }
    SaveDeliveryRecieptData(data: any) {

        return this.http.post(ApiService.saveDileveryRecieptDataURL, data);
    }
    GetAllTradesByUseridForBuyer(buyerId: any) {
        let data = {
            buyerId: buyerId
        }
        return this.http.post(ApiService.GetAllTradesByUseridForBuyerURL, data);
    }
    getAllTradeForBuyer(buyerId: any){
        let data = {
            buyerId: buyerId
        }
        return this.http.post(ApiService.GetAllTradeForDashboardBuyerURL, data);
    }
    getAllTradeForSeller(sellerId: any){
        let data = {
            sellerId: sellerId
        }
        return this.http.post(ApiService.GetAllTradeForDashboardSellerURL, data);
    }
    getBillTradingDataForBuyer(id: any) {
        let data = {
            userId: id
        }
        return this.http.post(ApiService.getBillTradingDataForBuyerURL, data);
    }
    getBillTradingDataForSeller(id: any) {
        let data = {
            userId: id
        }
        return this.http.post(ApiService.getBillTradingDataForSellerURL, data);
    }
    getUpcomingDeliveryBuyer(data:any){
        return this.http.post(ApiService.getUpcomingDeliveryBuyerURL,data);
    }
    getUpcomingPaymentBuyer(data:any){
        return this.http.post(ApiService.getUpcomingPaymentBuyerURL,data);
    }
    getUpcomingDeliverySeller(data:any){
        return this.http.post(ApiService.getUpcomingDeliverySellerURL,data);
    }
    getUpcomingPaymentSeller( data:any){
        return this.http.post(ApiService.getUpcomingPaymentSellerURL,data);
    }
    closeTradeFromAdmin(data:any){
        return this.http.post(ApiService.closeTradeFromAdminURL,data);
    }
    getTradeOnQuality(data:any){
        return this.http.post(ApiService.getTradeOnQualityURL,data);
    }
}
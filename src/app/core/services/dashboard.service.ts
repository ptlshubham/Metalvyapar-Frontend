import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`api/users`);
    }
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
    registerUser(data: any) {
        return this.http.post(ApiService.RegisterNewCustomerURL, data);
    }
    getDashboardTradeList() {
        return this.http.get(ApiService.GetAllTradeForDashboardURL);
    }
    getTopTenBuyerByCommision() {

        return this.http.get(ApiService.GetTopBuyerByCommisionURL);
    }
    getAllTradeList() {

        return this.http.get(ApiService.getAllTradeListURL);
    }
    getBuyerList() {
        return this.http.get(ApiService.getBuyerListURL);
    }
    getAllUserList() {
        return this.http.get(ApiService.getAllUserListURL);
    }
    getSellerList() {
        return this.http.get(ApiService.getSellerListURL);
    }
    getKycPendingList() {
        return this.http.get(ApiService.getKycPendingListURL);
    }
    getUpcomingDeliveryAdmin() {
        return this.http.get(ApiService.GetUpcomingDeliveryForDashboardURL);
    }
    getMasterDataByDateRange(data: any) {
        return this.http.post(ApiService.getMasterDataByDateRangeListURL, data);
    }
    sendEmailDocument(data: any) {
        return this.http.post(ApiService.sendEmailDocumentFromAdminURL, data);
    }
    getUpcomingPaymentAdmin() {
        return this.http.get(ApiService.GetUpcomingPaymentForDashboardURL)
    }
    updateKycUser(data: any) {
        return this.http.post(ApiService.updateKYCURL, data)
    }
    getOlderOrderInitiated(data: any) {
         
        return this.http.post(ApiService.getOlderInitiatedOrderAdminURL, data);
    }
    sendCancelKYCMsg(data: any) {

        return this.http.post(ApiService.sendCancelKYCMsgAdminURL, data);
    }
    getCompletedTradeList() {
        return this.http.get(ApiService.GetCompletedTradesForDashboardURL);
    }
    getTotalCommision() {
        return this.http.get(ApiService.GetTotalCommisionURL);
    }
    getTotalTradeQualityMaterial() {
        return this.http.get(ApiService.GetTopTradeQualityMaterialURL);
    }
    getTopTradeStatus() {
        return this.http.get(ApiService.GetTopTradeStatusURL);
    }
    getCommisionSummaryList() {
        return this.http.get(ApiService.GetCommisionSummaryListURL);
    }
    getInitiatedOrderList() {
        return this.http.get(ApiService.GetInitiatedOrderForAdminURL);
    }
    getOrderDetailList(data: any) {
        return this.http.post(ApiService.getOrderDetailAdminURL, data);
    }
    getRejectedKYCList() {
        return this.http.get(ApiService.getRejectedKYCListURL);
    }
    chageUserState(data: any) {
        return this.http.post(ApiService.changeStateUserURL, data);
    }
    saveSubscriptionDetails(data: any) {
        return this.http.post(ApiService.saveSubscriptionDataURL, data);
    }
    getAllMembershipData(){
        return this.http.get(ApiService.getMembershipDataURL);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /**
     * Get All User
     */
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    /**
     * Facked User Register
     */
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
    registerUser(data: any) {
         
        return this.http.post(ApiService.RegisterNewCustomerURL, data);
    }
    saveSupportData(data: any) {
        return this.http.post(ApiService.SaveContactDataURL, data);
    }
    getSupportData() {
        return this.http.get(ApiService.getContactDataURL);
    }
    emailMarkAsRead(id: any) {
        let data = {
            id: id
        }
        return this.http.post(ApiService.updateContactMarkAsReadURL, data);
    }
    emailMarkAsUnread(id: any) {
        let data = {
            id: id
        }
        return this.http.post(ApiService.updateContactMarkAsUnreadURL, data);
    }
    removeEmail(id:any){
         
        return this.http.get(ApiService.removeEmailFromListURL+id);
    }
    verifyOldPassword(data: any) {
        return this.http.post(ApiService.CheckExistingPasswordURL, data);
    }
    verifyOldAdminPassword(data: any) {
        return this.http.post(ApiService.CheckExistingPasswordAdminURL, data);
    }
    userLogin(email: any, pass: any, role: any) {
        let data = {
            email: email,
            pass: pass,
            role: role
        };
        return this.http.post(ApiService.userLoginURL, data);
    }

    adminLogin(email: any, pass: any) {
        let data = {
            email: email,
            pass: pass
        };
        return this.http.post(ApiService.adminLoginURL, data);
    }
    uploadCancelCheckImage(img: any): Observable<any> {
        return this.http.post<any>(ApiService.uploadCancelCheckImageURL, img);
    }

    completeProfile(data: any) {
        return this.http.post(ApiService.completeProfileURL, data);
    }
    confirmKYCUser(data: any) {
        return this.http.post(ApiService.completeKYCUserURL, data);
    }
    forgotPwd(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.forgotPasswordURL, admin);
    }
    getOneTimePwd(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.getOneTimePasswordURL, admin)
    }
    forgotAdminPwd(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.adminForgotPasswordURL, admin);
    }
    getAdminOneTimePwd(admin: any): Observable<any> {
         
        return this.http.post<any>(ApiService.getAdminOneTimePasswordURL, admin)
    }
    updatePassword(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.updatePasswordURL, admin);
    }
    updatePasswordAdmin(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.updatePasswordAdminURL, admin);
    }
    getUserDetail(id: any) {
        return this.http.get(ApiService.getUserDetailById + id)
    }
    public getStateFromJson(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/state.json');
    }
    public getCityFromJson(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/state-city.json');
    }
    public getQualityListJson(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/quality.json');
    }
    public getQualityListForBuyer(data: any) {
         
        return this.http.post<any>(ApiService.getQualityListBuyerURL, data);
    }
}

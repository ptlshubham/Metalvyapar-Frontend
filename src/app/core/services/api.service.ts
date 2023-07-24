import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:9000";
  // public static HOST_URL: string = "https://api.metalvyapar.com";

  toasts: any[] = [];
  constructor(
    private http: HttpClient,
  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
//Admin APIs
  public static userLoginURL: string = ApiService.HOST_URL + '/authenticate/userLogin';
  public static adminLoginURL: string = ApiService.HOST_URL + '/authenticate/adminLogin';
  public static RegisterNewCustomerURL: string = ApiService.HOST_URL + '/admin/RegisterNewUser';
  public static SaveContactDataURL: string = ApiService.HOST_URL + '/admin/SaveContactData';
  public static getContactDataURL: string = ApiService.HOST_URL + '/admin/GetContactData';
  public static updateContactMarkAsReadURL: string = ApiService.HOST_URL + '/admin/UpdateContactMarkAsRead';
  public static updateContactMarkAsUnreadURL: string = ApiService.HOST_URL + '/admin/updateContactMarkAsUnread';
  public static removeEmailFromListURL: string = ApiService.HOST_URL + '/admin/RemoveEmailFromList/';
  public static getBuyerListURL: string = ApiService.HOST_URL + '/admin/getAllBuyer';
  public static getAllTradeListURL: string = ApiService.HOST_URL + '/admin/getAllTrades';
  public static getAllUserListURL: string = ApiService.HOST_URL + '/admin/getAllUser';
  public static getSellerListURL: string = ApiService.HOST_URL + '/admin/getAllSeller';
  public static getKycPendingListURL: string = ApiService.HOST_URL + '/admin/getAllKYCPendingUser';
  public static getMasterDataByDateRangeListURL: string = ApiService.HOST_URL + '/admin/getMasterDataByDateRangeList';
  public static updateKYCURL: string = ApiService.HOST_URL + '/admin/updateKYCUser';
  public static getAllTradingDatabyIdForSellerAdminURL: string = ApiService.HOST_URL + '/admin/getAllTradingDatabyIdForSeller';
  public static completeProfileURL: string = ApiService.HOST_URL + '/admin/completeProfile';
  public static completeKYCUserURL: string = ApiService.HOST_URL + '/admin/completeKYCUser';
  public static uploadCancelCheckImageURL: string = ApiService.HOST_URL + '/admin/UploadCancelCheckImage';
  public static GetAllTradesByUseridForBuyerURL: string = ApiService.HOST_URL + '/admin/GetAllTradesByUseridForBuyer';
  public static GetAllTradeForDashboardURL: string = ApiService.HOST_URL + '/admin/GetAllTradeForDashboard';
  public static forgotPasswordURL: string = ApiService.HOST_URL + '/admin/ForgotPassword';
  public static getOneTimePasswordURL: string = ApiService.HOST_URL + '/admin/GetOneTimePassword';
  public static adminForgotPasswordURL: string = ApiService.HOST_URL + '/admin/AdminForgotPassword';
  public static getAdminOneTimePasswordURL: string = ApiService.HOST_URL + '/admin/GetAdminOneTimePassword';
  public static updatePasswordAdminURL: string = ApiService.HOST_URL + '/admin/updatePasswordAccordingRole';
  public static GetUpcomingDeliveryForDashboardURL: string = ApiService.HOST_URL + '/admin/GetUpcomingDeliveryForDashboard'
  public static GetUpcomingPaymentForDashboardURL: string = ApiService.HOST_URL + '/admin/GetUpcomingPaymentForDashboard'
  public static GetCompletedTradesForDashboardURL: string = ApiService.HOST_URL + '/admin/GetCompletedTradesForDashboard';
  public static CheckExistingPasswordAdminURL: string = ApiService.HOST_URL + '/admin/CheckExistingPasswordAdmin';
  public static GetTopBuyerByCommisionURL: string = ApiService.HOST_URL + '/admin/GetTopBuyerByCommision';
  public static GetTotalCommisionURL: string = ApiService.HOST_URL + '/admin/GetTotalCommision';
  public static GetTopTradeQualityMaterialURL: string = ApiService.HOST_URL + '/admin/GetTopTradeQualityMaterial';
  public static GetTopTradeStatusURL: string = ApiService.HOST_URL + '/admin/GetTopTradeStatus';
  public static GetCommisionSummaryListURL: string = ApiService.HOST_URL + '/admin/GetCommisionSummaryList';
  public static GetInitiatedOrderForAdminURL: string = ApiService.HOST_URL + '/admin/GetInitiatedOrderForAdmin';
  public static getOrderDetailAdminURL: string = ApiService.HOST_URL + '/admin/getOrderDetailAdmin';
  public static getOlderInitiatedOrderAdminURL: string = ApiService.HOST_URL + '/admin/getOlderInitiatedOrderAdmin';
  public static getRejectedKYCListURL: string = ApiService.HOST_URL + '/admin/getRejectedKYCList';
  public static closeTradeFromAdminURL: string = ApiService.HOST_URL + '/admin/closeTradeFromAdmin';
  public static getTradeOnQualityURL: string = ApiService.HOST_URL + '/admin/getTradeOnQuality';
  public static changeStateUserURL: string = ApiService.HOST_URL + '/admin/changeStateUser';
  public static sendEmailDocumentFromAdminURL: string = ApiService.HOST_URL + '/admin/SendEmailDocumentFromAdmin';
  public static saveSubscriptionDataURL: string = ApiService.HOST_URL + '/admin/SaveSubscriptionData';
  public static getMembershipDataURL: string = ApiService.HOST_URL + '/admin/GetMembershipData';
  public static sendCancelKYCMsgAdminURL: string = ApiService.HOST_URL + '/admin/sendCancelKYCMsgAdmin';
  public static getTransporterDetailsbyIdForAdminURL: string = ApiService.HOST_URL + '/admin/getTransporterDetailsbyIdForAdmin';
  public static getTransporterDetailsbyIdForSellerAdminURL: string = ApiService.HOST_URL + '/admin/GetTransporterDetailsbyIdForSeller';
  public static getAllSellerResponseAdminURL: string = ApiService.HOST_URL + '/admin/getAllSellerResponse';
  //User APIs
  public static CheckExistingPasswordURL: string = ApiService.HOST_URL + '/trading/CheckExistingPassword';
  public static updatePasswordURL: string = ApiService.HOST_URL + '/trading/updatePasswordAccordingRole';
  public static GetAllTradeForDashboardBuyerURL: string = ApiService.HOST_URL + '/trading/GetAllTradeForDashboardBuyer';
  public static GetAllTradeForDashboardSellerURL: string = ApiService.HOST_URL + '/trading/GetAllTradeForDashboardSeller';
  public static newTradeRequestURL: string = ApiService.HOST_URL + '/trading/newTradeRequest';
  public static getQualityListBuyerURL: string = ApiService.HOST_URL + '/trading/getQualityListBuyer';
  public static getUserDetailById: string = ApiService.HOST_URL + '/trading/getUserDetailById/'
  public static getAllTradingDatabyIdForBuyerURL: string = ApiService.HOST_URL + '/trading/getAllTradingDatabyIdForBuyer';
  public static getAllActiveTradingDatabyIdForBuyerURL: string = ApiService.HOST_URL + '/trading/getAllActiveTradingDatabyIdForBuyer';
  public static uploadMaterialImageURL: string = ApiService.HOST_URL + '/trading/UploadMaterialImage';
  public static getAllTradingDatabyIdForSellerURL: string = ApiService.HOST_URL + '/trading/getAllTradingDatabyIdForSeller';
  public static uploadMaterialMultiImageURL: string = ApiService.HOST_URL + '/trading/UploadMaterialMultiImage';
  public static getAllSellerResponseURL: string = ApiService.HOST_URL + '/trading/getAllSellerResponse';
  public static getAllTradingDatabyIdURL: string = ApiService.HOST_URL + '/trading/getAllTradingDatabyId';
  public static getNewTradingReqForSellerURL: string = ApiService.HOST_URL + '/trading/getNewTradingReqForSeller';
  public static saveSellerTradeRequestURL: string = ApiService.HOST_URL + '/trading/saveSellerTradeRequest';
  public static newComissionPaymentForBuyerURL: string = ApiService.HOST_URL + '/trading/NewComissionPaymentForBuyer';
  public static newComissionPaymentForSellerURL: string = ApiService.HOST_URL + '/trading/NewComissionPaymentForSeller';
  public static uploadWeightSlipImageURL: string = ApiService.HOST_URL + '/trading/UploadWeightSlipImage';
  public static uploadDeliveryRecieptImageURL: string = ApiService.HOST_URL + '/trading/UploadDeliveryRecieptImage';
  public static removeRecentWeightImgURL: string = ApiService.HOST_URL + '/trading/RemoveRecentWeightImg/';
  public static saveTransporterDetailsURL: string = ApiService.HOST_URL + '/trading/SaveTransporterDetails';
  public static getTransporterDetailsbyIdForSellerURL: string = ApiService.HOST_URL + '/trading/GetTransporterDetailsbyIdForSeller';
  public static uploadPaymentSlipImageURL: string = ApiService.HOST_URL + '/trading/UploadPaymentSlipImage';
  public static saveBuyerPaymentDetailsURL: string = ApiService.HOST_URL + '/trading/SaveBuyerPaymentDetails';
  public static invoiceRecieptImageUploadURL: string = ApiService.HOST_URL + '/trading/InvoiceRecieptImageUpload';
  public static saveDileveryRecieptDataURL: string = ApiService.HOST_URL + '/trading/SaveDeliveryRecieptData';
  public static getBillTradingDataForBuyerURL: string = ApiService.HOST_URL + '/trading/getBillTradingDataForBuyer';
  public static getBillTradingDataForSellerURL: string = ApiService.HOST_URL + '/trading/getBillTradingDataForSeller';
  public static rejectTradeFromBuyerURL: string = ApiService.HOST_URL + '/trading/rejectTradeFromBuyer';
  public static getMaterialsImagesURL: string = ApiService.HOST_URL + '/trading/GetMaterialsImages/';
  public static deleteBuyerTradeURL: string = ApiService.HOST_URL + '/trading/deleteBuyerTrade';
  public static deleteSellerTradeURL: string = ApiService.HOST_URL + '/trading/deleteSellerTrade';
  public static getUpcomingDeliveryBuyerURL: string = ApiService.HOST_URL + '/trading/getUpcomingDeliveryBuyer';
  public static getUpcomingPaymentBuyerURL: string = ApiService.HOST_URL + '/trading/getUpcomingPaymentBuyer';
  public static getUpcomingDeliverySellerURL: string = ApiService.HOST_URL + '/trading/getUpcomingDeliverySeller';
  public static getUpcomingPaymentSellerURL: string = ApiService.HOST_URL + '/trading/getUpcomingPaymentSeller';

  //Cashfree APIS
  public static createCashfreeOrderURL: string = ApiService.HOST_URL + '/cashfree/createCashfreeOrder';

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showNotification(from: any, align: any, msg: any, color: any) {
    var color = color;
    $.notify({
      icon: "",
      message: msg
    }, {
      type: color,
      timer: 2000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="fa fa-times"></i></button> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    });
  }

}

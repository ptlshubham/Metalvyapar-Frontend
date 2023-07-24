// Table data
export interface Table {
  //for acttive rejected approved trade
  srno: number;
  Date: string;
  Time: string;
  OrderId: string;
  TradeId: string;
  Quality: string;
  BuyerName: string;
  BuyerLocation: string;
  BuyerQuantity: string;
  BuyerRate: number;
  PaymentTerms: string;
  SellerName: string;
  SellerLocation: string;
  SellerQuantity: string;
  DeliveryTerms: string;
  DeliveryDue: string;
  MaterialImage: string;
  Status: string;
  TradeValidity: string;
  DispatchDate: string;
  Quantity: number;
  InvoiceAmount: number;
  InvoiceImage: string;
  WeightSlip: string;
  VehicleNumber: string;
  TransporterContact: string;
  DeliveryDate: string;
  DeliveryWeightSlip: string;
  PaymentDueDate: string;
  UtrNo: string;
  PaymentScreenshot: string;
  PaymentDate: string;
  RejectedMessage: string;
  Name: string;
  Address: string;
  Location: string;
  AverageMonthQuantity: number;
  Salutation: string;
  FirstName: string;
  LastName: string;
  Designation: string;
  PhoneNo: string;
  AlternateNo: string;
  Email: string;
  Password: string;
  GSTNo: string;
  PANNo: string;
  BankName: string;
  AccountName: string;
  AccountNo: string;
  AccountType: string;
  IFSCCode: string;
  BankBranch: string;
  CancelCheque: string;
  Role: string;
  Commision: string;
  SellerResponse: number;
  Subscription: string;
  Uid:number;
  // Subscripition Data
  StartDate: string,
  EndDate: string
  Remaining: string
  IsActive: number;
  IsSubscribe:number;
}
export interface TablePayment {

  srno: number;
  TradeDate: string;
  TradeId: string;
  BuyerName: string;
  SellerName: string;
  PaymentDueDate: string;
  InvoiceAmount: number;
}

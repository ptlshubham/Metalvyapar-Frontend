export class SellerTrade {
    id?: number;
    OrderId?: number;
    BuyerId?:number;
    buyFirstName?: string;
    buyLastName?: string;
    BuyerQuality?: string;
    BuyerQuantity?: number;
    address?: string;
    PaymentValidity?: string;
    BuyerRate?: number;
    PaymentTerms?: string;
    diliveryTerms?: number;
    sell_quantity?: number;
    PaymentDays?: number;
    materialImage?: string;
    tradeStatus?: string;
    sellerId?: string;
    sellerName?: string;
    buyerLocation?: string;
    materialMultiImage: any = [];
}

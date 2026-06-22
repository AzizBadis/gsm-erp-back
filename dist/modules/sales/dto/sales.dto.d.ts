export declare class CreateDiscountDto {
    name: string;
    priority?: number;
    brand?: string;
    category?: string;
    location?: string;
    productType?: string;
    amount: number;
    amountType?: string;
    startsAt?: string;
    endsAt?: string;
    customerGroup?: string;
    isActive?: boolean;
}
export declare class CreateSalesImportDto {
    fileName: string;
    invoiceCount?: number;
}

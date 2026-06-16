export declare class CreateInvoiceItemDto {
    productId?: string;
    description: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateInvoiceDto {
    contactId: string;
    repairId?: string;
    tax?: number;
    items: CreateInvoiceItemDto[];
}

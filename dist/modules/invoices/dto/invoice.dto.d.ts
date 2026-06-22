import { InvoiceDocumentType } from '@prisma/client';
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
    discount?: number;
    documentType?: InvoiceDocumentType;
    status?: string;
    shippingStatus?: string;
    items: CreateInvoiceItemDto[];
}

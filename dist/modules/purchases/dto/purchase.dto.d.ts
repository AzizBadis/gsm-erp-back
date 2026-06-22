import { PurchaseKind, PurchaseStatus } from '@prisma/client';
export declare class CreatePurchaseItemDto {
    productId?: string;
    productName: string;
    quantity: number;
    unitCost: number;
    margin?: number;
    salePrice?: number;
}
export declare class CreatePurchaseDto {
    kind: PurchaseKind;
    supplierName: string;
    reference?: string;
    location?: string;
    status?: PurchaseStatus;
    purchaseDate?: string;
    discount?: number;
    tax?: number;
    shipping?: number;
    paidAmount?: number;
    notes?: string;
    items: CreatePurchaseItemDto[];
}

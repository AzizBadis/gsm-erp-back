import { StockTransferStatus } from '@prisma/client';
export declare class StockTransferItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateStockTransferDto {
    reference?: string;
    transferDate?: string;
    fromLocation: string;
    toLocation: string;
    status?: StockTransferStatus;
    shippingCharges?: number;
    notes?: string;
    items: StockTransferItemDto[];
}

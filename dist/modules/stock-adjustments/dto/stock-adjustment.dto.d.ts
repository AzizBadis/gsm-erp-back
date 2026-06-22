import { StockAdjustmentType } from '@prisma/client';
export declare class StockAdjustmentItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateStockAdjustmentDto {
    reference?: string;
    adjustmentDate?: string;
    location: string;
    type: StockAdjustmentType;
    recoveredAmount?: number;
    reason?: string;
    items: StockAdjustmentItemDto[];
}

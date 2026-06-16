export declare class CreateProductDto {
    name: string;
    sku: string;
    description?: string;
    unitPrice: number;
    stockQty?: number;
    minStockQty?: number;
}
export declare class UpdateProductDto {
    name?: string;
    sku?: string;
    description?: string;
    unitPrice?: number;
    stockQty?: number;
    minStockQty?: number;
}

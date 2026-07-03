export declare class CreateProductDto {
    name: string;
    sku: string;
    barcode?: string;
    brand?: string;
    category?: string;
    unit?: string;
    warranty?: string;
    productType?: string;
    description?: string;
    unitPrice: number;
    taxRate?: number;
    stockQty?: number;
    minStockQty?: number;
}
export declare class UpdateProductDto {
    name?: string;
    sku?: string;
    barcode?: string;
    brand?: string;
    category?: string;
    unit?: string;
    warranty?: string;
    productType?: string;
    description?: string;
    unitPrice?: number;
    taxRate?: number;
    stockQty?: number;
    minStockQty?: number;
}

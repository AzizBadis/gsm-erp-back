import { CreatePurchaseDto, PurchaseFilterDto } from './dto/purchase.dto';
import { PurchasesService } from './purchases.service';
export declare class PurchasesController {
    private readonly service;
    constructor(service: PurchasesService);
    findAll(query: PurchaseFilterDto): Promise<{
        data: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    brand: string | null;
                    description: string | null;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
                    stockQty: number;
                    minStockQty: number;
                } | null;
            } & {
                id: string;
                productId: string | null;
                quantity: number;
                purchaseId: string;
                productName: string;
                unitCost: import("@prisma/client/runtime/library").Decimal;
                margin: import("@prisma/client/runtime/library").Decimal;
                salePrice: import("@prisma/client/runtime/library").Decimal;
                lineTotal: import("@prisma/client/runtime/library").Decimal;
            })[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.PurchaseStatus;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            reference: string;
            paymentStatus: import(".prisma/client").$Enums.PurchasePaymentStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
            kind: import(".prisma/client").$Enums.PurchaseKind;
            supplierName: string;
            location: string;
            purchaseDate: Date;
            shipping: import("@prisma/client/runtime/library").Decimal;
            addedBy: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreatePurchaseDto, user: {
        fullName: string;
        email: string;
    }): Promise<{
        items: {
            id: string;
            productId: string | null;
            quantity: number;
            purchaseId: string;
            productName: string;
            unitCost: import("@prisma/client/runtime/library").Decimal;
            margin: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.PurchaseStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        reference: string;
        paymentStatus: import(".prisma/client").$Enums.PurchasePaymentStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
        kind: import(".prisma/client").$Enums.PurchaseKind;
        supplierName: string;
        location: string;
        purchaseDate: Date;
        shipping: import("@prisma/client/runtime/library").Decimal;
        addedBy: string;
    }>;
}

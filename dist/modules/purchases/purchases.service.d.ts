import { PrismaService } from '../../prisma/prisma.service';
import { CreatePurchaseDto, PurchaseFilterDto } from './dto/purchase.dto';
export declare class PurchasesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: PurchaseFilterDto): Promise<{
        data: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string | null;
                    sku: string;
                    barcode: string | null;
                    brand: string | null;
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
                purchaseId: string;
                productId: string | null;
                productName: string;
                quantity: number;
                unitCost: import("@prisma/client/runtime/library").Decimal;
                margin: import("@prisma/client/runtime/library").Decimal;
                salePrice: import("@prisma/client/runtime/library").Decimal;
                lineTotal: import("@prisma/client/runtime/library").Decimal;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            reference: string;
            kind: import(".prisma/client").$Enums.PurchaseKind;
            supplierName: string;
            location: string;
            status: import(".prisma/client").$Enums.PurchaseStatus;
            paymentStatus: import(".prisma/client").$Enums.PurchasePaymentStatus;
            purchaseDate: Date;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            shipping: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            addedBy: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreatePurchaseDto, addedBy: string): Promise<{
        items: {
            id: string;
            purchaseId: string;
            productId: string | null;
            productName: string;
            quantity: number;
            unitCost: import("@prisma/client/runtime/library").Decimal;
            margin: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reference: string;
        kind: import(".prisma/client").$Enums.PurchaseKind;
        supplierName: string;
        location: string;
        status: import(".prisma/client").$Enums.PurchaseStatus;
        paymentStatus: import(".prisma/client").$Enums.PurchasePaymentStatus;
        purchaseDate: Date;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        addedBy: string;
    }>;
}

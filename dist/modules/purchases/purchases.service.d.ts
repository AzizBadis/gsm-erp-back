import { PurchaseKind } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/purchase.dto';
export declare class PurchasesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: PaginationDto, kind?: PurchaseKind): Promise<{
        data: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
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
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            reference: string;
            status: import(".prisma/client").$Enums.PurchaseStatus;
            notes: string | null;
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
    create(dto: CreatePurchaseDto, addedBy: string): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        reference: string;
        status: import(".prisma/client").$Enums.PurchaseStatus;
        notes: string | null;
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

import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockAdjustmentDto } from './dto/stock-adjustment.dto';
export declare class StockAdjustmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(q: PaginationDto): Promise<{
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
                };
            } & {
                id: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
                quantity: number;
                lineTotal: import("@prisma/client/runtime/library").Decimal;
                adjustmentId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            reference: string;
            type: import(".prisma/client").$Enums.StockAdjustmentType;
            reason: string | null;
            location: string;
            addedBy: string;
            adjustmentDate: Date;
            recoveredAmount: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateStockAdjustmentDto, addedBy: string): Promise<{
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
            };
        } & {
            id: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
            adjustmentId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        reference: string;
        type: import(".prisma/client").$Enums.StockAdjustmentType;
        reason: string | null;
        location: string;
        addedBy: string;
        adjustmentDate: Date;
        recoveredAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
}

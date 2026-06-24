import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateStockAdjustmentDto } from './dto/stock-adjustment.dto';
import { StockAdjustmentsService } from './stock-adjustments.service';
export declare class StockAdjustmentsController {
    private readonly service;
    constructor(service: StockAdjustmentsService);
    findAll(q: PaginationDto): Promise<{
        data: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string | null;
                    sku: string;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
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
    create(dto: CreateStockAdjustmentDto, u: AuthUser): Promise<{
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                sku: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
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

import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateStockTransferDto } from './dto/stock-transfer.dto';
import { StockTransfersService } from './stock-transfers.service';
export declare class StockTransfersController {
    private readonly service;
    constructor(service: StockTransfersService);
    findAll(query: PaginationDto): Promise<{
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
                transferId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            reference: string;
            status: import(".prisma/client").$Enums.StockTransferStatus;
            notes: string | null;
            addedBy: string;
            toLocation: string;
            fromLocation: string;
            transferDate: Date;
            shippingCharges: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateStockTransferDto, user: AuthUser): Promise<{
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
            transferId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        reference: string;
        status: import(".prisma/client").$Enums.StockTransferStatus;
        notes: string | null;
        addedBy: string;
        toLocation: string;
        fromLocation: string;
        transferDate: Date;
        shippingCharges: import("@prisma/client/runtime/library").Decimal;
    }>;
}

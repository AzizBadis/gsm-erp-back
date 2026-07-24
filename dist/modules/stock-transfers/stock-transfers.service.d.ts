import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockTransferDto } from './dto/stock-transfer.dto';
export declare class StockTransfersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: PaginationDto): Promise<{
        data: ({
            items: ({
                product: {
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
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
                quantity: number;
                productId: string;
                lineTotal: import("@prisma/client/runtime/library").Decimal;
                transferId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.StockTransferStatus;
            notes: string | null;
            reference: string;
            addedBy: string;
            transferDate: Date;
            fromLocation: string;
            toLocation: string;
            shippingCharges: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateStockTransferDto, addedBy: string): Promise<{
        items: ({
            product: {
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
            quantity: number;
            productId: string;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
            transferId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.StockTransferStatus;
        notes: string | null;
        reference: string;
        addedBy: string;
        transferDate: Date;
        fromLocation: string;
        toLocation: string;
        shippingCharges: import("@prisma/client/runtime/library").Decimal;
    }>;
}

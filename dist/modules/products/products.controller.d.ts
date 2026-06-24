import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    create(dto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        sku: string;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        stockQty: number;
        minStockQty: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(query: PaginationDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            sku: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            stockQty: number;
            minStockQty: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        movements: {
            id: string;
            createdAt: Date;
            productId: string;
            type: import(".prisma/client").$Enums.StockMovementType;
            quantity: number;
            reason: string | null;
            repairId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        sku: string;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        stockQty: number;
        minStockQty: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        sku: string;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        stockQty: number;
        minStockQty: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

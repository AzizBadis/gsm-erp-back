import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(query: PaginationDto): Promise<{
        data: {
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

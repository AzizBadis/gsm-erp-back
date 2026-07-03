import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { CreateDiscountDto, CreateSalesImportDto } from './dto/sales.dto';
import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly service;
    constructor(service: SalesService);
    listDiscounts(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        startsAt: Date | null;
        endsAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        brand: string | null;
        isActive: boolean;
        category: string | null;
        productType: string | null;
        location: string | null;
        priority: number;
        amountType: string;
        customerGroup: string | null;
    }[]>;
    createDiscount(dto: CreateDiscountDto): import(".prisma/client").Prisma.Prisma__SalesDiscountClient<{
        id: string;
        startsAt: Date | null;
        endsAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        brand: string | null;
        isActive: boolean;
        category: string | null;
        productType: string | null;
        location: string | null;
        priority: number;
        amountType: string;
        customerGroup: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listImports(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        createdBy: string;
        fileName: string;
        invoiceCount: number;
    }[]>;
    createImport(dto: CreateSalesImportDto, user: AuthUser): import(".prisma/client").Prisma.Prisma__SalesImportClient<{
        id: string;
        createdAt: Date;
        createdBy: string;
        fileName: string;
        invoiceCount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

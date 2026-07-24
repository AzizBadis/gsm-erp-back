import { PrismaService } from '../../prisma/prisma.service';
import { CreateDiscountDto, CreateSalesImportDto } from './dto/sales.dto';
export declare class SalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listDiscounts(): import(".prisma/client").Prisma.PrismaPromise<{
        brand: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        priority: number;
        endsAt: Date | null;
        startsAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string | null;
        productType: string | null;
        location: string | null;
        amountType: string;
        customerGroup: string | null;
    }[]>;
    createDiscount(dto: CreateDiscountDto): import(".prisma/client").Prisma.Prisma__SalesDiscountClient<{
        brand: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        priority: number;
        endsAt: Date | null;
        startsAt: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string | null;
        productType: string | null;
        location: string | null;
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
    createImport(dto: CreateSalesImportDto, createdBy: string): import(".prisma/client").Prisma.Prisma__SalesImportClient<{
        id: string;
        createdAt: Date;
        createdBy: string;
        fileName: string;
        invoiceCount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

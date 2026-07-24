import { PrismaService } from '../../prisma/prisma.service';
import { CreateCatalogItemDto, UpdateCatalogItemDto } from './gps-catalog.dto';
export declare class GpsCatalogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listModels(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createModel(dto: CreateCatalogItemDto): import(".prisma/client").Prisma.Prisma__GpsModelClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateModel(id: string, dto: UpdateCatalogItemDto): import(".prisma/client").Prisma.Prisma__GpsModelClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteModel(id: string): import(".prisma/client").Prisma.Prisma__GpsModelClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listOperators(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createOperator(dto: CreateCatalogItemDto): import(".prisma/client").Prisma.Prisma__OperatorClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateOperator(id: string, dto: UpdateCatalogItemDto): import(".prisma/client").Prisma.Prisma__OperatorClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteOperator(id: string): import(".prisma/client").Prisma.Prisma__OperatorClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

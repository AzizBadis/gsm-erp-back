import { CreateCatalogItemDto, UpdateCatalogItemDto } from './gps-catalog.dto';
import { GpsCatalogService } from './gps-catalog.service';
export declare class GpsCatalogController {
    private readonly service;
    constructor(service: GpsCatalogService);
    models(): import(".prisma/client").Prisma.PrismaPromise<{
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
    operators(): import(".prisma/client").Prisma.PrismaPromise<{
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

import { PaginationDto } from '../../common/dto/pagination.dto';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
export declare class BrandsController {
    private readonly service;
    constructor(service: BrandsService);
    create(dto: CreateBrandDto): import(".prisma/client").Prisma.Prisma__BrandClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(query: PaginationDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__BrandClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateBrandDto): import(".prisma/client").Prisma.Prisma__BrandClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__BrandClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

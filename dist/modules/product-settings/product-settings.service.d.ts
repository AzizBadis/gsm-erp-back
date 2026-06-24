import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto/product-setting.dto';
export declare class ProductSettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(type: string, search?: string): Prisma.PrismaPromise<{
        id: string;
        type: string;
        name: string;
        description: string | null;
        data: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(type: string, dto: CreateProductSettingDto): Prisma.Prisma__GrhRecordClient<{
        id: string;
        type: string;
        name: string;
        description: string | null;
        data: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateProductSettingDto): Prisma.Prisma__GrhRecordClient<{
        id: string;
        type: string;
        name: string;
        description: string | null;
        data: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Prisma.Prisma__GrhRecordClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private storageType;
    private assertType;
}

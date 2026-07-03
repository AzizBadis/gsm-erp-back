import { CreateProductSettingDto, UpdateProductSettingDto } from './dto/product-setting.dto';
import { ProductSettingsService } from './product-settings.service';
export declare class ProductSettingsController {
    private readonly settings;
    constructor(settings: ProductSettingsService);
    findAll(type: string, search?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        type: string;
    }[]>;
    create(type: string, dto: CreateProductSettingDto): import(".prisma/client").Prisma.Prisma__GrhRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateProductSettingDto): import(".prisma/client").Prisma.Prisma__GrhRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__GrhRecordClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

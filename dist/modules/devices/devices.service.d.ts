import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeviceDto, CreateDeviceModelDto, UpdateDeviceDto, UpdateDeviceModelDto } from './dto/device.dto';
export declare class DevicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateDeviceDto): import(".prisma/client").Prisma.Prisma__DeviceClient<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__DeviceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateDeviceDto): import(".prisma/client").Prisma.Prisma__DeviceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__DeviceClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createModel(dto: CreateDeviceModelDto): import(".prisma/client").Prisma.Prisma__DeviceModelClient<{
        brand: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deviceId: string;
        brandId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findModels(query: PaginationDto): Promise<{
        data: ({
            brand: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            deviceId: string;
            brandId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findModel(id: string): import(".prisma/client").Prisma.Prisma__DeviceModelClient<{
        brand: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deviceId: string;
        brandId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateModel(id: string, dto: UpdateDeviceModelDto): import(".prisma/client").Prisma.Prisma__DeviceModelClient<{
        brand: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        deviceId: string;
        brandId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    removeModel(id: string): import(".prisma/client").Prisma.Prisma__DeviceModelClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

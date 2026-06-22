import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateTechnicianDto, UpdateTechnicianDto } from './dto/technician.dto';
import { TechniciansService } from './technicians.service';
export declare class TechniciansController {
    private readonly service;
    constructor(service: TechniciansService);
    create(dto: CreateTechnicianDto): Promise<{
        user: {
            id: string;
            email: string;
            passwordHash: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        specialty: string | null;
    }>;
    findAll(query: PaginationDto): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                passwordHash: string;
                fullName: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            specialty: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TechnicianClient<{
        user: {
            id: string;
            email: string;
            passwordHash: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        repairs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            reference: string;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            status: string;
            imei: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            repairTypeId: string | null;
            receivedAt: Date;
            deliveredAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        specialty: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateTechnicianDto): import(".prisma/client").Prisma.Prisma__TechnicianClient<{
        user: {
            id: string;
            email: string;
            passwordHash: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        specialty: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TechnicianClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTechnicianDto, UpdateTechnicianDto } from './dto/technician.dto';
export declare class TechniciansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTechnicianDto): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            roleId: string | null;
            isActive: boolean;
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
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                email: string;
                passwordHash: string;
                role: import(".prisma/client").$Enums.UserRole;
                roleId: string | null;
                isActive: boolean;
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
        repairs: {
            id: string;
            contactId: string;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            reference: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            imei: string | null;
            devicePassword: string | null;
            lockReason: string | null;
            problem: string;
            diagnosis: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            repairTypeId: string | null;
            receivedAt: Date;
            deliveredAt: Date | null;
        }[];
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            roleId: string | null;
            isActive: boolean;
        };
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
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.UserRole;
            roleId: string | null;
            isActive: boolean;
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

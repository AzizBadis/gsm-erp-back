import { PrismaService } from '../../prisma/prisma.service';
import { CreateRepairTypeDto, UpdateRepairTypeDto, BulkRepairTypeItemDto, BulkStatusMappingItemDto, CommissionQueryDto } from './dto/technician-management.dto';
export declare class TechnicianManagementService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalRepaired: number;
        totalReturns: number;
        totalBroken: number;
        totalPending: number;
        totalLosses: number;
        totalCommissions: number;
        bestTechnician: {
            name: string;
            commission: number;
        } | null;
        avgTat: number;
        techniciansPerformance: {
            technicianId: string;
            name: string;
            specialty: string;
            repairedCount: number;
            returnsCount: number;
            brokenCount: number;
            commissionsSum: number;
            avgTat: number;
        }[];
        chartData: {
            labels: string[];
            repairDatasets: {
                label: string;
                data: number[];
            }[];
            commissionDatasets: {
                label: string;
                data: number[];
            }[];
        };
    }>;
    getCommissions(query: CommissionQueryDto): Promise<{
        data: ({
            technician: {
                user: {
                    id: string;
                    email: string;
                    passwordHash: string;
                    fullName: string;
                    role: import(".prisma/client").$Enums.UserRole;
                    roleId: string | null;
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
            };
            repair: {
                repairType: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    commissionRate: import("@prisma/client/runtime/library").Decimal;
                    managedByAdmin: boolean;
                } | null;
            } & {
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
            };
            repairType: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                commissionRate: import("@prisma/client/runtime/library").Decimal;
                managedByAdmin: boolean;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairTypeId: string | null;
            repairId: string;
            commissionBrute: import("@prisma/client/runtime/library").Decimal;
            deductionRetour: import("@prisma/client/runtime/library").Decimal;
            deductionPerte: import("@prisma/client/runtime/library").Decimal;
            commissionNette: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getRepairTypes(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        managedByAdmin: boolean;
    }[]>;
    createRepairType(dto: CreateRepairTypeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        managedByAdmin: boolean;
    }>;
    updateRepairType(id: string, dto: UpdateRepairTypeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        managedByAdmin: boolean;
    }>;
    deleteRepairType(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        managedByAdmin: boolean;
    }>;
    bulkSaveRepairTypes(types: BulkRepairTypeItemDto[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        managedByAdmin: boolean;
    }[]>;
    getStatusMappings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        event: string;
        statusId: string;
    }[]>;
    createStatusMapping(dto: {
        event: string;
        status: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        event: string;
        statusId: string;
    }>;
    updateStatusMapping(id: string, dto: {
        event?: string;
        status?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        event: string;
        statusId: string;
    }>;
    deleteStatusMapping(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        event: string;
        statusId: string;
    }>;
    bulkSaveStatusMappings(mappings: BulkStatusMappingItemDto[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        event: string;
        statusId: string;
    }[]>;
    handleStatusChange(repairId: string, newStatus: string): Promise<void>;
}

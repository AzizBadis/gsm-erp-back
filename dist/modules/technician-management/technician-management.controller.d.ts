import { TechnicianManagementService } from './technician-management.service';
import { CreateRepairTypeDto, UpdateRepairTypeDto, BulkSaveRepairTypesDto, BulkSaveStatusMappingsDto, CommissionQueryDto } from './dto/technician-management.dto';
export declare class TechnicianManagementController {
    private readonly service;
    constructor(service: TechnicianManagementService);
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
    bulkSaveRepairTypes(dto: BulkSaveRepairTypesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        managedByAdmin: boolean;
    }[]>;
    getStatusMappings(): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        event: string;
        statusId: string;
    }[]>;
    createStatusMapping(dto: {
        event: string;
        status: string;
    }): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        event: string;
        statusId: string;
    }>;
    updateStatusMapping(id: string, dto: {
        event?: string;
        status?: string;
    }): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        event: string;
        statusId: string;
    }>;
    deleteStatusMapping(id: string): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        event: string;
        statusId: string;
    }>;
    bulkSaveStatusMappings(dto: BulkSaveStatusMappingsDto): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        event: string;
        statusId: string;
    }[]>;
}

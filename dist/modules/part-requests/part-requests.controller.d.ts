import { PaginationDto } from '../../common/dto/pagination.dto';
import { RejectPartRequestDto } from './dto/part-request.dto';
import { PartRequestsService } from './part-requests.service';
export declare class PartRequestsController {
    private readonly service;
    constructor(service: PartRequestsService);
    findAll(query: PaginationDto): Promise<{
        data: ({
            repair: {
                contact: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    fullName: string;
                    phone: string;
                    email: string | null;
                    address: string | null;
                };
            } & {
                id: string;
                reference: string;
                contactId: string;
                deviceId: string;
                deviceModelId: string | null;
                technicianId: string | null;
                status: import(".prisma/client").$Enums.RepairStatus;
                imei: string | null;
                problem: string;
                diagnosis: string | null;
                notes: string | null;
                photos: string[];
                estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
                receivedAt: Date;
                deliveredAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
            technician: {
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    fullName: string;
                    email: string;
                    passwordHash: string;
                    role: import(".prisma/client").$Enums.UserRole;
                    isActive: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                specialty: string | null;
            };
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    stockQty: number;
                    minStockQty: number;
                };
            } & {
                id: string;
                partRequestId: string;
                productId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            technicianId: string;
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PartRequestClient<{
        repair: {
            contact: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                phone: string;
                email: string | null;
                address: string | null;
            };
        } & {
            id: string;
            reference: string;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            status: import(".prisma/client").$Enums.RepairStatus;
            imei: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        technician: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                email: string;
                passwordHash: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            specialty: string | null;
        };
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                description: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                stockQty: number;
                minStockQty: number;
            };
        } & {
            id: string;
            partRequestId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    approve(id: string): Promise<{
        repair: {
            contact: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                phone: string;
                email: string | null;
                address: string | null;
            };
        } & {
            id: string;
            reference: string;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            status: import(".prisma/client").$Enums.RepairStatus;
            imei: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        technician: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                email: string;
                passwordHash: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            specialty: string | null;
        };
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                description: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                stockQty: number;
                minStockQty: number;
            };
        } & {
            id: string;
            partRequestId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }>;
    reject(id: string, dto: RejectPartRequestDto): import(".prisma/client").Prisma.Prisma__PartRequestClient<{
        repair: {
            contact: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                phone: string;
                email: string | null;
                address: string | null;
            };
        } & {
            id: string;
            reference: string;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            status: import(".prisma/client").$Enums.RepairStatus;
            imei: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        technician: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                email: string;
                passwordHash: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            specialty: string | null;
        };
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                description: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                stockQty: number;
                minStockQty: number;
            };
        } & {
            id: string;
            partRequestId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deliver(id: string): Promise<{
        repair: {
            contact: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                phone: string;
                email: string | null;
                address: string | null;
            };
        } & {
            id: string;
            reference: string;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            status: import(".prisma/client").$Enums.RepairStatus;
            imei: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        technician: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                email: string;
                passwordHash: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            specialty: string | null;
        };
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                description: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                stockQty: number;
                minStockQty: number;
            };
        } & {
            id: string;
            partRequestId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }>;
}

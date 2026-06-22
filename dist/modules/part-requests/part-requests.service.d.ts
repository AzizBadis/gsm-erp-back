import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PartRequestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: PaginationDto): Promise<{
        data: ({
            technician: {
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
            };
            repair: {
                contact: {
                    id: string;
                    email: string | null;
                    fullName: string;
                    createdAt: Date;
                    updatedAt: Date;
                    phone: string;
                    address: string | null;
                };
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
                productId: string;
                quantity: number;
                partRequestId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            status: import(".prisma/client").$Enums.PartRequestStatus;
            reason: string | null;
            repairId: string;
            rejectionReason: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PartRequestClient<{
        technician: {
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
        };
        repair: {
            contact: {
                id: string;
                email: string | null;
                fullName: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
                address: string | null;
            };
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
            productId: string;
            quantity: number;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    approve(id: string): Promise<{
        technician: {
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
        };
        repair: {
            contact: {
                id: string;
                email: string | null;
                fullName: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
                address: string | null;
            };
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
            productId: string;
            quantity: number;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }>;
    reject(id: string, reason: string): import(".prisma/client").Prisma.Prisma__PartRequestClient<{
        technician: {
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
        };
        repair: {
            contact: {
                id: string;
                email: string | null;
                fullName: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
                address: string | null;
            };
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
            productId: string;
            quantity: number;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deliver(id: string): Promise<{
        technician: {
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
        };
        repair: {
            contact: {
                id: string;
                email: string | null;
                fullName: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
                address: string | null;
            };
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
            productId: string;
            quantity: number;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }>;
    private include;
}

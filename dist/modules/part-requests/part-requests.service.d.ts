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
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    brand: string | null;
                    description: string | null;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
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
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                brand: string | null;
                description: string | null;
                sku: string;
                barcode: string | null;
                category: string | null;
                unit: string | null;
                warranty: string | null;
                productType: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                taxRate: import("@prisma/client/runtime/library").Decimal;
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
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    approve(id: string): Promise<{
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
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                brand: string | null;
                description: string | null;
                sku: string;
                barcode: string | null;
                category: string | null;
                unit: string | null;
                warranty: string | null;
                productType: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                taxRate: import("@prisma/client/runtime/library").Decimal;
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
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }>;
    reject(id: string, reason: string): import(".prisma/client").Prisma.Prisma__PartRequestClient<{
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
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                brand: string | null;
                description: string | null;
                sku: string;
                barcode: string | null;
                category: string | null;
                unit: string | null;
                warranty: string | null;
                productType: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                taxRate: import("@prisma/client/runtime/library").Decimal;
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
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deliver(id: string): Promise<{
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
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                brand: string | null;
                description: string | null;
                sku: string;
                barcode: string | null;
                category: string | null;
                unit: string | null;
                warranty: string | null;
                productType: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                taxRate: import("@prisma/client/runtime/library").Decimal;
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
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        reason: string | null;
        repairId: string;
        rejectionReason: string | null;
    }>;
    private include;
}

import { PaginationDto } from '../../common/dto/pagination.dto';
import { RejectPartRequestDto } from './dto/part-request.dto';
import { PartRequestsService } from './part-requests.service';
export declare class PartRequestsController {
    private readonly service;
    constructor(service: PartRequestsService);
    findAll(query: PaginationDto): Promise<{
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
                contactId: string;
                status: string;
                notes: string | null;
                deviceId: string;
                reference: string;
                deviceModelId: string | null;
                technicianId: string | null;
                imei: string | null;
                simNumber: string | null;
                gpsIdentifier: string | null;
                clientCode: string | null;
                checklist: string[];
                gpsModelId: string | null;
                operatorId: string | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
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
                quantity: number;
                productId: string;
                partRequestId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PartRequestStatus;
            technicianId: string;
            repairId: string;
            reason: string | null;
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
            contactId: string;
            status: string;
            notes: string | null;
            deviceId: string;
            reference: string;
            deviceModelId: string | null;
            technicianId: string | null;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            gpsModelId: string | null;
            operatorId: string | null;
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
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
            quantity: number;
            productId: string;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        technicianId: string;
        repairId: string;
        reason: string | null;
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
            contactId: string;
            status: string;
            notes: string | null;
            deviceId: string;
            reference: string;
            deviceModelId: string | null;
            technicianId: string | null;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            gpsModelId: string | null;
            operatorId: string | null;
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
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
            quantity: number;
            productId: string;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        technicianId: string;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }>;
    reject(id: string, dto: RejectPartRequestDto): import(".prisma/client").Prisma.Prisma__PartRequestClient<{
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
            contactId: string;
            status: string;
            notes: string | null;
            deviceId: string;
            reference: string;
            deviceModelId: string | null;
            technicianId: string | null;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            gpsModelId: string | null;
            operatorId: string | null;
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
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
            quantity: number;
            productId: string;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        technicianId: string;
        repairId: string;
        reason: string | null;
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
            contactId: string;
            status: string;
            notes: string | null;
            deviceId: string;
            reference: string;
            deviceModelId: string | null;
            technicianId: string | null;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            gpsModelId: string | null;
            operatorId: string | null;
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
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
            quantity: number;
            productId: string;
            partRequestId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PartRequestStatus;
        technicianId: string;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }>;
}

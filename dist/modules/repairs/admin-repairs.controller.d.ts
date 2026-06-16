import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { AssignRepairDto, CreateRepairDto, UpdateRepairStatusDto } from './dto/repair.dto';
import { RepairsService } from './repairs.service';
export declare class AdminRepairsController {
    private readonly repairs;
    constructor(repairs: RepairsService);
    create(dto: CreateRepairDto): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            brand: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            deviceId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            brandId: string;
        }) | null;
        technician: ({
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
        }) | null;
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
        partRequests: ({
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
        invoices: {
            number: string;
            id: string;
            contactId: string;
            createdAt: Date;
            updatedAt: Date;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
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
    }>;
    findAll(query: RepairFilterDto): Promise<{
        data: ({
            contact: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                phone: string;
                email: string | null;
                address: string | null;
            };
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            deviceModel: ({
                device: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                };
                brand: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                };
            } & {
                id: string;
                deviceId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                brandId: string;
            }) | null;
            technician: ({
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
            }) | null;
            timerLogs: {
                id: string;
                createdAt: Date;
                repairId: string;
                startedAt: Date;
                endedAt: Date | null;
                durationSec: number | null;
            }[];
            partRequests: ({
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
            invoices: {
                number: string;
                id: string;
                contactId: string;
                createdAt: Date;
                updatedAt: Date;
                repairId: string | null;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                subtotal: import("@prisma/client/runtime/library").Decimal;
                tax: import("@prisma/client/runtime/library").Decimal;
                total: import("@prisma/client/runtime/library").Decimal;
                paidAmount: import("@prisma/client/runtime/library").Decimal;
            }[];
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    statuses(): ("RECEIVED" | "ASSIGNED" | "IN_PROGRESS" | "PAUSED" | "WAITING_PARTS" | "PARTS_READY" | "FINISHED" | "DELIVERED" | "CANCELLED")[];
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RepairClient<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            brand: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            deviceId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            brandId: string;
        }) | null;
        technician: ({
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
        }) | null;
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
        partRequests: ({
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
        invoices: {
            number: string;
            id: string;
            contactId: string;
            createdAt: Date;
            updatedAt: Date;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    assign(id: string, dto: AssignRepairDto): import(".prisma/client").Prisma.Prisma__RepairClient<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            brand: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            deviceId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            brandId: string;
        }) | null;
        technician: ({
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
        }) | null;
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
        partRequests: ({
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
        invoices: {
            number: string;
            id: string;
            contactId: string;
            createdAt: Date;
            updatedAt: Date;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateStatus(id: string, dto: UpdateRepairStatusDto): import(".prisma/client").Prisma.Prisma__RepairClient<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            brand: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            deviceId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            brandId: string;
        }) | null;
        technician: ({
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
        }) | null;
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
        partRequests: ({
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
        invoices: {
            number: string;
            id: string;
            contactId: string;
            createdAt: Date;
            updatedAt: Date;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

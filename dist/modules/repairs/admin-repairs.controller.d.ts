import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { AssignRepairDto, CreateRepairDto, UpdateRepairStatusDto } from './dto/repair.dto';
import { CreateCustomStatusDto, UpdateCustomStatusDto } from './dto/custom-status.dto';
import { RepairsService } from './repairs.service';
export declare class AdminRepairsController {
    private readonly repairs;
    constructor(repairs: RepairsService);
    create(dto: CreateRepairDto): Promise<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        };
        technician: ({
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
        }) | null;
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
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
        }) | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
        invoices: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            contactId: string;
            status: string;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
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
    }>;
    findAll(query: RepairFilterDto): Promise<{
        data: ({
            contact: {
                id: string;
                email: string | null;
                fullName: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
                address: string | null;
            };
            technician: ({
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
            }) | null;
            device: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
            deviceModel: ({
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
            }) | null;
            repairType: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                commissionRate: import("@prisma/client/runtime/library").Decimal;
                managedByAdmin: boolean;
            } | null;
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
            invoices: {
                number: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                total: import("@prisma/client/runtime/library").Decimal;
                contactId: string;
                status: string;
                repairId: string | null;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
                shippingStatus: string;
                subtotal: import("@prisma/client/runtime/library").Decimal;
                discount: import("@prisma/client/runtime/library").Decimal;
                tax: import("@prisma/client/runtime/library").Decimal;
                paidAmount: import("@prisma/client/runtime/library").Decimal;
            }[];
            timerLogs: {
                id: string;
                createdAt: Date;
                repairId: string;
                startedAt: Date;
                endedAt: Date | null;
                durationSec: number | null;
            }[];
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    statuses(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        label: string;
        color: string;
    }[]>;
    createStatus(dto: CreateCustomStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        label: string;
        color: string;
    }>;
    updateStatusDetail(id: string, dto: UpdateCustomStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        label: string;
        color: string;
    }>;
    deleteStatus(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        label: string;
        color: string;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RepairClient<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        };
        technician: ({
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
        }) | null;
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
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
        }) | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
        invoices: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            contactId: string;
            status: string;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    assign(id: string, dto: AssignRepairDto): Promise<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        };
        technician: ({
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
        }) | null;
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
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
        }) | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
        invoices: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            contactId: string;
            status: string;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
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
    }>;
    updateStatus(id: string, dto: UpdateRepairStatusDto): Promise<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        };
        technician: ({
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
        }) | null;
        device: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        deviceModel: ({
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
        }) | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
        invoices: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            contactId: string;
            status: string;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
        timerLogs: {
            id: string;
            createdAt: Date;
            repairId: string;
            startedAt: Date;
            endedAt: Date | null;
            durationSec: number | null;
        }[];
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
    }>;
}

import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignRepairDto, CreateRepairDto, RequestPartsDto, UpdateRepairNotesDto, UpdateRepairStatusDto } from './dto/repair.dto';
import { TechnicianManagementService } from '../technician-management/technician-management.service';
export declare class RepairsService {
    private readonly prisma;
    private readonly technicianManagement;
    constructor(prisma: PrismaService, technicianManagement: TechnicianManagementService);
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
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    assign(id: string, dto: AssignRepairDto): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    updateStatus(id: string, dto: UpdateRepairStatusDto): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
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
            technician: ({
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
                deviceId: string;
                name: string;
                brandId: string;
            }) | null;
            gpsModel: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            } | null;
            operator: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            } | null;
            repairType: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                commissionRate: import("@prisma/client/runtime/library").Decimal;
                managedByAdmin: boolean;
            } | null;
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
                        brand: string | null;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        sku: string;
                        barcode: string | null;
                        category: string | null;
                        unit: string | null;
                        warranty: string | null;
                        productType: string | null;
                        description: string | null;
                        unitPrice: import("@prisma/client/runtime/library").Decimal;
                        taxRate: import("@prisma/client/runtime/library").Decimal;
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
                status: import(".prisma/client").$Enums.PartRequestStatus;
                createdAt: Date;
                updatedAt: Date;
                technicianId: string;
                repairId: string;
                reason: string | null;
                rejectionReason: string | null;
            })[];
            invoices: {
                number: string;
                id: string;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                contactId: string;
                repairId: string | null;
                employeeId: string | null;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
                shippingStatus: string;
                subtotal: import("@prisma/client/runtime/library").Decimal;
                discount: import("@prisma/client/runtime/library").Decimal;
                tax: import("@prisma/client/runtime/library").Decimal;
                total: import("@prisma/client/runtime/library").Decimal;
                paidAmount: import("@prisma/client/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            reference: string;
            status: string;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            devicePassword: string | null;
            lockReason: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            gpsModelId: string | null;
            operatorId: string | null;
            repairTypeId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
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
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    technicianTasks(technicianId: string, query: RepairFilterDto): Promise<{
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
            technician: ({
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
                deviceId: string;
                name: string;
                brandId: string;
            }) | null;
            gpsModel: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            } | null;
            operator: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            } | null;
            repairType: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                commissionRate: import("@prisma/client/runtime/library").Decimal;
                managedByAdmin: boolean;
            } | null;
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
                        brand: string | null;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        sku: string;
                        barcode: string | null;
                        category: string | null;
                        unit: string | null;
                        warranty: string | null;
                        productType: string | null;
                        description: string | null;
                        unitPrice: import("@prisma/client/runtime/library").Decimal;
                        taxRate: import("@prisma/client/runtime/library").Decimal;
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
                status: import(".prisma/client").$Enums.PartRequestStatus;
                createdAt: Date;
                updatedAt: Date;
                technicianId: string;
                repairId: string;
                reason: string | null;
                rejectionReason: string | null;
            })[];
            invoices: {
                number: string;
                id: string;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                contactId: string;
                repairId: string | null;
                employeeId: string | null;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
                shippingStatus: string;
                subtotal: import("@prisma/client/runtime/library").Decimal;
                discount: import("@prisma/client/runtime/library").Decimal;
                tax: import("@prisma/client/runtime/library").Decimal;
                total: import("@prisma/client/runtime/library").Decimal;
                paidAmount: import("@prisma/client/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            reference: string;
            status: string;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            devicePassword: string | null;
            lockReason: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            gpsModelId: string | null;
            operatorId: string | null;
            repairTypeId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    technicianTask(id: string, technicianId: string): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    start(id: string, technicianId: string): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    pause(id: string, technicianId: string): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    resume(id: string, technicianId: string): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    finish(id: string, technicianId: string): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    updateNotes(id: string, technicianId: string, dto: UpdateRepairNotesDto): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    requestParts(id: string, technicianId: string, dto: RequestPartsDto): Promise<{
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
            id: string;
            reference: string;
            status: string;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            devicePassword: string | null;
            lockReason: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            gpsModelId: string | null;
            operatorId: string | null;
            repairTypeId: string | null;
        };
        items: ({
            product: {
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                barcode: string | null;
                category: string | null;
                unit: string | null;
                warranty: string | null;
                productType: string | null;
                description: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                taxRate: import("@prisma/client/runtime/library").Decimal;
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
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    }>;
    partRequestsForTechnician(technicianId: string): import(".prisma/client").Prisma.PrismaPromise<({
        repair: {
            id: string;
            reference: string;
            status: string;
            imei: string | null;
            simNumber: string | null;
            gpsIdentifier: string | null;
            clientCode: string | null;
            checklist: string[];
            devicePassword: string | null;
            lockReason: string | null;
            problem: string;
            diagnosis: string | null;
            notes: string | null;
            photos: string[];
            estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
            receivedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            deviceId: string;
            deviceModelId: string | null;
            technicianId: string | null;
            gpsModelId: string | null;
            operatorId: string | null;
            repairTypeId: string | null;
        };
        items: ({
            product: {
                brand: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                barcode: string | null;
                category: string | null;
                unit: string | null;
                warranty: string | null;
                productType: string | null;
                description: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                taxRate: import("@prisma/client/runtime/library").Decimal;
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
        status: import(".prisma/client").$Enums.PartRequestStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        repairId: string;
        reason: string | null;
        rejectionReason: string | null;
    })[]>;
    deliverToClient(id: string): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        technician: ({
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
            deviceId: string;
            name: string;
            brandId: string;
        }) | null;
        gpsModel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        operator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        } | null;
        repairType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            managedByAdmin: boolean;
        } | null;
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
                    brand: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    barcode: string | null;
                    category: string | null;
                    unit: string | null;
                    warranty: string | null;
                    productType: string | null;
                    description: string | null;
                    unitPrice: import("@prisma/client/runtime/library").Decimal;
                    taxRate: import("@prisma/client/runtime/library").Decimal;
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
            status: import(".prisma/client").$Enums.PartRequestStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            repairId: string;
            reason: string | null;
            rejectionReason: string | null;
        })[];
        invoices: {
            number: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            contactId: string;
            repairId: string | null;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        reference: string;
        status: string;
        imei: string | null;
        simNumber: string | null;
        gpsIdentifier: string | null;
        clientCode: string | null;
        checklist: string[];
        devicePassword: string | null;
        lockReason: string | null;
        problem: string;
        diagnosis: string | null;
        notes: string | null;
        photos: string[];
        estimatedCost: import("@prisma/client/runtime/library").Decimal | null;
        receivedAt: Date;
        deliveredAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        contactId: string;
        deviceId: string;
        deviceModelId: string | null;
        technicianId: string | null;
        gpsModelId: string | null;
        operatorId: string | null;
        repairTypeId: string | null;
    }>;
    totalDurationSec(id: string): Promise<number>;
    private ensureAssigned;
    private ensureNoActiveTimer;
    private closeActiveTimer;
    private repairInclude;
    getStatuses(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        label: string;
        color: string;
    }[]>;
    createStatus(dto: {
        name: string;
        label: string;
        color?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        label: string;
        color: string;
    }>;
    updateStatusDetail(id: string, dto: {
        name?: string;
        label?: string;
        color?: string;
    }): Promise<{
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
}

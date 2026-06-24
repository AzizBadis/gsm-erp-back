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
                    description: string | null;
                    sku: string;
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
                    description: string | null;
                    sku: string;
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
                    description: string | null;
                    sku: string;
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
                        description: string | null;
                        sku: string;
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
                    description: string | null;
                    sku: string;
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
    technicianTasks(technicianId: string, query: RepairFilterDto): Promise<{
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
                        description: string | null;
                        sku: string;
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
    technicianTask(id: string, technicianId: string): Promise<{
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
                    description: string | null;
                    sku: string;
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
    start(id: string, technicianId: string): Promise<{
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
                    description: string | null;
                    sku: string;
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
    pause(id: string, technicianId: string): Promise<{
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
                    description: string | null;
                    sku: string;
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
    resume(id: string, technicianId: string): Promise<{
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
                    description: string | null;
                    sku: string;
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
    finish(id: string, technicianId: string): Promise<{
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
                    description: string | null;
                    sku: string;
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
    updateNotes(id: string, technicianId: string, dto: UpdateRepairNotesDto): Promise<{
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
                    description: string | null;
                    sku: string;
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
    requestParts(id: string, technicianId: string, dto: RequestPartsDto): Promise<{
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
                description: string | null;
                sku: string;
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
    partRequestsForTechnician(technicianId: string): import(".prisma/client").Prisma.PrismaPromise<({
        repair: {
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
                description: string | null;
                sku: string;
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
    })[]>;
    deliverToClient(id: string): Promise<{
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
                    description: string | null;
                    sku: string;
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

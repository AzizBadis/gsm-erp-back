import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignRepairDto, CreateRepairDto, RequestPartsDto, UpdateRepairNotesDto, UpdateRepairStatusDto } from './dto/repair.dto';
export declare class RepairsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    requestParts(id: string, technicianId: string, dto: RequestPartsDto): Promise<{
        repair: {
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
    partRequestsForTechnician(technicianId: string): import(".prisma/client").Prisma.PrismaPromise<({
        repair: {
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
    totalDurationSec(id: string): Promise<number>;
    private ensureAssigned;
    private ensureNoActiveTimer;
    private closeActiveTimer;
    private repairInclude;
}

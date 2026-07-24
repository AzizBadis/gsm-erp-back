import { RepairsService } from '../repairs/repairs.service';
export declare class CashierRepairsController {
    private readonly repairs;
    constructor(repairs: RepairsService);
    deliver(id: string): Promise<{
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
}

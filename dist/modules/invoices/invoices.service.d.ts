import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto, InvoiceFilterDto } from './dto/invoice.dto';
export declare class InvoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: InvoiceFilterDto): Promise<{
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
            repair: {
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
            } | null;
            payments: {
                id: string;
                amount: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
                method: string;
                reference: string | null;
                invoiceId: string;
                cashierId: string;
                paymentAccountId: string | null;
            }[];
            items: {
                id: string;
                total: import("@prisma/client/runtime/library").Decimal;
                description: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string | null;
                quantity: number;
                invoiceId: string;
            }[];
        } & {
            number: string;
            id: string;
            contactId: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            repairId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateInvoiceDto): Promise<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        repair: {
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
        } | null;
        payments: {
            id: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            method: string;
            reference: string | null;
            invoiceId: string;
            cashierId: string;
            paymentAccountId: string | null;
        }[];
        items: {
            id: string;
            total: import("@prisma/client/runtime/library").Decimal;
            description: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string | null;
            quantity: number;
            invoiceId: string;
        }[];
    } & {
        number: string;
        id: string;
        contactId: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        repairId: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
        shippingStatus: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
}

import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/invoice.dto';
export declare class InvoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: PaginationDto): Promise<{
        data: ({
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
            } | null;
            contact: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                phone: string;
                email: string | null;
                address: string | null;
            };
            items: {
                id: string;
                total: import("@prisma/client/runtime/library").Decimal;
                productId: string | null;
                quantity: number;
                description: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                invoiceId: string;
            }[];
            payments: {
                id: string;
                reference: string | null;
                createdAt: Date;
                invoiceId: string;
                cashierId: string;
                amount: import("@prisma/client/runtime/library").Decimal;
                method: string;
            }[];
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateInvoiceDto): Promise<{
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
        } | null;
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        };
        items: {
            id: string;
            total: import("@prisma/client/runtime/library").Decimal;
            productId: string | null;
            quantity: number;
            description: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            invoiceId: string;
        }[];
        payments: {
            id: string;
            reference: string | null;
            createdAt: Date;
            invoiceId: string;
            cashierId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: string;
        }[];
    } & {
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
    }>;
}

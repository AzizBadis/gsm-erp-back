import { InvoiceDocumentType } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { InvoicesService } from './invoices.service';
export declare class InvoicesController {
    private readonly service;
    constructor(service: InvoicesService);
    findAll(query: PaginationDto, documentType?: InvoiceDocumentType): Promise<{
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
            } | null;
            payments: {
                id: string;
                createdAt: Date;
                reference: string | null;
                invoiceId: string;
                cashierId: string;
                amount: import("@prisma/client/runtime/library").Decimal;
                method: string;
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateInvoiceDto): Promise<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
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
        } | null;
        payments: {
            id: string;
            createdAt: Date;
            reference: string | null;
            invoiceId: string;
            cashierId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: string;
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
    }>;
}

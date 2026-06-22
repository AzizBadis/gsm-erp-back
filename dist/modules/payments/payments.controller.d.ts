import { AuthUser } from '../../common/decorators/current-user.decorator';
import { CreatePaymentDto } from './dto/payment.dto';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly service;
    constructor(service: PaymentsService);
    create(dto: CreatePaymentDto, user: AuthUser): Promise<{
        invoice: {
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
        };
        cashier: {
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
        reference: string | null;
        invoiceId: string;
        cashierId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string;
        paymentAccountId: string | null;
    }>;
}

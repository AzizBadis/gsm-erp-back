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
            repairId: string | null;
            contactId: string;
            employeeId: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            documentType: import(".prisma/client").$Enums.InvoiceDocumentType;
            status: string;
            shippingStatus: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
            updatedAt: Date;
        };
        cashier: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            passwordHash: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            roleId: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string;
        reference: string | null;
        createdAt: Date;
        invoiceId: string;
        cashierId: string;
        paymentAccountId: string | null;
    }>;
}

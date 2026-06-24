import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateAccountTransactionDto, CreatePaymentAccountDto } from './dto/payment-account.dto';
import { PaymentAccountsService } from './payment-accounts.service';
export declare class PaymentAccountsController {
    private readonly s;
    constructor(s: PaymentAccountsService);
    accounts(): Promise<{
        balance: number;
        transactions: {
            id: string;
            createdAt: Date;
            description: string | null;
            reference: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            transactionDate: Date;
            invoiceReference: string | null;
            paymentType: string | null;
            direction: import(".prisma/client").$Enums.AccountTransactionDirection;
            createdBy: string;
            accountId: string;
        }[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        createdBy: string;
        accountType: string;
        accountNumber: string | null;
        initialBalance: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    create(d: CreatePaymentAccountDto, u: AuthUser): import(".prisma/client").Prisma.Prisma__PaymentAccountClient<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        createdBy: string;
        accountType: string;
        accountNumber: string | null;
        initialBalance: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    transactions(q: PaginationDto): Promise<{
        data: ({
            account: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                createdBy: string;
                accountType: string;
                accountNumber: string | null;
                initialBalance: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            createdAt: Date;
            description: string | null;
            reference: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            transactionDate: Date;
            invoiceReference: string | null;
            paymentType: string | null;
            direction: import(".prisma/client").$Enums.AccountTransactionDirection;
            createdBy: string;
            accountId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    createTransaction(d: CreateAccountTransactionDto, u: AuthUser): import(".prisma/client").Prisma.Prisma__AccountTransactionClient<{
        account: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            createdBy: string;
            accountType: string;
            accountNumber: string | null;
            initialBalance: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        reference: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        transactionDate: Date;
        invoiceReference: string | null;
        paymentType: string | null;
        direction: import(".prisma/client").$Enums.AccountTransactionDirection;
        createdBy: string;
        accountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    trial(): Promise<{
        id: string;
        name: string;
        debit: number;
        credit: number;
    }[]>;
}

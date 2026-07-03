import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountTransactionDto, CreatePaymentAccountDto, UpdatePaymentAccountDto } from './dto/payment-account.dto';
export declare class PaymentAccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    accounts(): Promise<{
        balance: number;
        transactions: {
            id: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            description: string | null;
            reference: string | null;
            transactionDate: Date;
            invoiceReference: string | null;
            paymentType: string | null;
            direction: import(".prisma/client").$Enums.AccountTransactionDirection;
            createdBy: string;
            accountId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        description: string | null;
        createdBy: string;
        accountType: string;
        accountNumber: string | null;
        initialBalance: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    createAccount(dto: CreatePaymentAccountDto, createdBy: string): import(".prisma/client").Prisma.Prisma__PaymentAccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        description: string | null;
        createdBy: string;
        accountType: string;
        accountNumber: string | null;
        initialBalance: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateAccount(id: string, dto: UpdatePaymentAccountDto): import(".prisma/client").Prisma.Prisma__PaymentAccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        description: string | null;
        createdBy: string;
        accountType: string;
        accountNumber: string | null;
        initialBalance: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    transactions(query: PaginationDto): Promise<{
        data: ({
            account: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                isActive: boolean;
                description: string | null;
                createdBy: string;
                accountType: string;
                accountNumber: string | null;
                initialBalance: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            description: string | null;
            reference: string | null;
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
    createTransaction(dto: CreateAccountTransactionDto, createdBy: string): import(".prisma/client").Prisma.Prisma__AccountTransactionClient<{
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            description: string | null;
            createdBy: string;
            accountType: string;
            accountNumber: string | null;
            initialBalance: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
        id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        description: string | null;
        reference: string | null;
        transactionDate: Date;
        invoiceReference: string | null;
        paymentType: string | null;
        direction: import(".prisma/client").$Enums.AccountTransactionDirection;
        createdBy: string;
        accountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    trialBalance(): Promise<{
        id: string;
        name: string;
        debit: number;
        credit: number;
    }[]>;
}

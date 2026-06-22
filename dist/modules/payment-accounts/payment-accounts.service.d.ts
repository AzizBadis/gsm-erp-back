import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountTransactionDto, CreatePaymentAccountDto } from './dto/payment-account.dto';
export declare class PaymentAccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    accounts(): Promise<{
        balance: number;
        transactions: {
            id: string;
            createdAt: Date;
            reference: string | null;
            description: string | null;
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
    createAccount(dto: CreatePaymentAccountDto, createdBy: string): import(".prisma/client").Prisma.Prisma__PaymentAccountClient<{
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
            reference: string | null;
            description: string | null;
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
    createTransaction(dto: CreateAccountTransactionDto, createdBy: string): import(".prisma/client").Prisma.Prisma__AccountTransactionClient<{
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
        reference: string | null;
        description: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
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

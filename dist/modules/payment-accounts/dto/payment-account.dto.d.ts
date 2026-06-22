import { AccountTransactionDirection } from '@prisma/client';
export declare class CreatePaymentAccountDto {
    name: string;
    accountType: string;
    accountNumber?: string;
    description?: string;
    initialBalance?: number;
    isActive?: boolean;
}
export declare class CreateAccountTransactionDto {
    accountId: string;
    transactionDate?: string;
    reference?: string;
    invoiceReference?: string;
    amount: number;
    paymentType?: string;
    direction: AccountTransactionDirection;
    description?: string;
}

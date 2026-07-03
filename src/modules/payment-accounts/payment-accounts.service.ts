import { Injectable } from '@nestjs/common';
import { AccountTransactionDirection } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountTransactionDto, CreatePaymentAccountDto, UpdatePaymentAccountDto } from './dto/payment-account.dto';

@Injectable()
export class PaymentAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async accounts() {
    const rows = await this.prisma.paymentAccount.findMany({
      include: { transactions: true },
      orderBy: { name: 'asc' },
    });

    return rows.map((account) => ({
      ...account,
      balance:
        Number(account.initialBalance) +
        account.transactions.reduce(
          (sum, transaction) =>
            sum + (transaction.direction === AccountTransactionDirection.CREDIT ? Number(transaction.amount) : -Number(transaction.amount)),
          0,
        ),
    }));
  }

  createAccount(dto: CreatePaymentAccountDto, createdBy: string) {
    return this.prisma.paymentAccount.create({ data: { ...dto, createdBy } });
  }

  updateAccount(id: string, dto: UpdatePaymentAccountDto) {
    return this.prisma.paymentAccount.update({ where: { id }, data: dto });
  }

  async transactions(query: PaginationDto) {
    const where = query.search
      ? {
          OR: [
            { reference: { contains: query.search, mode: 'insensitive' as const } },
            { invoiceReference: { contains: query.search, mode: 'insensitive' as const } },
            { description: { contains: query.search, mode: 'insensitive' as const } },
            { account: { name: { contains: query.search, mode: 'insensitive' as const } } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.accountTransaction.findMany({
        where,
        include: { account: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { transactionDate: 'desc' },
      }),
      this.prisma.accountTransaction.count({ where }),
    ]);

    return { data, total, page: query.page, limit: query.limit };
  }

  createTransaction(dto: CreateAccountTransactionDto, createdBy: string) {
    return this.prisma.accountTransaction.create({
      data: { ...dto, transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : new Date(), createdBy },
      include: { account: true },
    });
  }

  async trialBalance() {
    const accounts = await this.prisma.paymentAccount.findMany({
      include: { transactions: true },
      orderBy: { name: 'asc' },
    });

    return accounts.map((account) => ({
      id: account.id,
      name: account.name,
      debit: account.transactions.filter((transaction) => transaction.direction === AccountTransactionDirection.DEBIT).reduce((sum, transaction) => sum + Number(transaction.amount), 0),
      credit:
        Number(account.initialBalance) +
        account.transactions.filter((transaction) => transaction.direction === AccountTransactionDirection.CREDIT).reduce((sum, transaction) => sum + Number(transaction.amount), 0),
    }));
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAccountsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentAccountsService = class PaymentAccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async accounts() {
        const rows = await this.prisma.paymentAccount.findMany({
            include: { transactions: true },
            orderBy: { name: 'asc' },
        });
        return rows.map((account) => ({
            ...account,
            balance: Number(account.initialBalance) +
                account.transactions.reduce((sum, transaction) => sum + (transaction.direction === client_1.AccountTransactionDirection.CREDIT ? Number(transaction.amount) : -Number(transaction.amount)), 0),
        }));
    }
    createAccount(dto, createdBy) {
        return this.prisma.paymentAccount.create({ data: { ...dto, createdBy } });
    }
    updateAccount(id, dto) {
        return this.prisma.paymentAccount.update({ where: { id }, data: dto });
    }
    async transactions(query) {
        const where = query.search
            ? {
                OR: [
                    { reference: { contains: query.search, mode: 'insensitive' } },
                    { invoiceReference: { contains: query.search, mode: 'insensitive' } },
                    { description: { contains: query.search, mode: 'insensitive' } },
                    { account: { name: { contains: query.search, mode: 'insensitive' } } },
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
    createTransaction(dto, createdBy) {
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
            debit: account.transactions.filter((transaction) => transaction.direction === client_1.AccountTransactionDirection.DEBIT).reduce((sum, transaction) => sum + Number(transaction.amount), 0),
            credit: Number(account.initialBalance) +
                account.transactions.filter((transaction) => transaction.direction === client_1.AccountTransactionDirection.CREDIT).reduce((sum, transaction) => sum + Number(transaction.amount), 0),
        }));
    }
};
exports.PaymentAccountsService = PaymentAccountsService;
exports.PaymentAccountsService = PaymentAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentAccountsService);
//# sourceMappingURL=payment-accounts.service.js.map
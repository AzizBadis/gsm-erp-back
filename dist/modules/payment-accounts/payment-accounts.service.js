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
    async accounts() { const rows = await this.prisma.paymentAccount.findMany({ include: { transactions: true }, orderBy: { name: 'asc' } }); return rows.map(a => ({ ...a, balance: Number(a.initialBalance) + a.transactions.reduce((s, t) => s + (t.direction === client_1.AccountTransactionDirection.CREDIT ? Number(t.amount) : -Number(t.amount)), 0) })); }
    createAccount(dto, createdBy) { return this.prisma.paymentAccount.create({ data: { ...dto, createdBy } }); }
    async transactions(q) { const where = q.search ? { OR: [{ reference: { contains: q.search, mode: 'insensitive' } }, { invoiceReference: { contains: q.search, mode: 'insensitive' } }, { description: { contains: q.search, mode: 'insensitive' } }, { account: { name: { contains: q.search, mode: 'insensitive' } } }] } : {}; const [data, total] = await Promise.all([this.prisma.accountTransaction.findMany({ where, include: { account: true }, skip: (q.page - 1) * q.limit, take: q.limit, orderBy: { transactionDate: 'desc' } }), this.prisma.accountTransaction.count({ where })]); return { data, total, page: q.page, limit: q.limit }; }
    createTransaction(dto, createdBy) { return this.prisma.accountTransaction.create({ data: { ...dto, transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : new Date(), createdBy }, include: { account: true } }); }
    async trialBalance() { const accounts = await this.prisma.paymentAccount.findMany({ include: { transactions: true }, orderBy: { name: 'asc' } }); return accounts.map(a => ({ id: a.id, name: a.name, debit: a.transactions.filter(t => t.direction === client_1.AccountTransactionDirection.DEBIT).reduce((s, t) => s + Number(t.amount), 0), credit: Number(a.initialBalance) + a.transactions.filter(t => t.direction === client_1.AccountTransactionDirection.CREDIT).reduce((s, t) => s + Number(t.amount), 0) })); }
};
exports.PaymentAccountsService = PaymentAccountsService;
exports.PaymentAccountsService = PaymentAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentAccountsService);
//# sourceMappingURL=payment-accounts.service.js.map
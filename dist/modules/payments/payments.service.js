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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, cashierId) {
        return this.prisma.$transaction(async (tx) => {
            const { parts, ...paymentData } = dto;
            const invoice = await tx.invoice.findUnique({
                where: { id: dto.invoiceId },
                include: { payments: { select: { amount: true } } },
            });
            if (!invoice)
                throw new common_1.BadRequestException('Facture introuvable');
            const alreadyPaid = invoice.payments.reduce((sum, item) => sum + Number(item.amount), 0);
            const remaining = Math.max(0, Number(invoice.total) - alreadyPaid);
            if (dto.amount > remaining + 0.001) {
                throw new common_1.BadRequestException(`Le montant dépasse le solde restant de ${remaining.toFixed(2)} DT`);
            }
            const allowedCombinations = [['Chèque', 'Espèce'], ['Espèce', 'Traite']];
            if (dto.method === 'Paiement partiel') {
                const methods = (parts ?? []).map((part) => part.method).sort();
                if (!allowedCombinations.some((combination) => [...combination].sort().join('|') === methods.join('|'))) {
                    throw new common_1.BadRequestException('Combinaison autorisée: Espèce + Chèque ou Espèce + Traite');
                }
                const partsTotal = (parts ?? []).reduce((sum, part) => sum + part.amount, 0);
                if (Math.abs(partsTotal - dto.amount) > 0.001)
                    throw new common_1.BadRequestException('La somme des paiements partiels doit correspondre au montant');
            }
            else if (parts?.length)
                throw new common_1.BadRequestException('Les détails partiels nécessitent le type Paiement partiel');
            const payment = await tx.payment.create({ data: { ...paymentData, cashierId }, include: { invoice: true, cashier: true } });
            if (parts?.length) {
                await tx.payment.createMany({ data: parts.slice(1).map((part) => ({ invoiceId: dto.invoiceId, cashierId, amount: part.amount, method: part.method, reference: part.reference, paymentAccountId: dto.paymentAccountId })) });
                await tx.payment.update({ where: { id: payment.id }, data: { amount: parts[0].amount, method: parts[0].method, reference: parts[0].reference } });
            }
            const paid = await tx.payment.aggregate({
                where: { invoiceId: dto.invoiceId },
                _sum: { amount: true },
            });
            if (dto.paymentAccountId) {
                await tx.accountTransaction.create({ data: {
                        accountId: dto.paymentAccountId,
                        invoiceReference: invoice.number,
                        reference: dto.reference,
                        amount: dto.amount,
                        paymentType: dto.method,
                        direction: client_1.AccountTransactionDirection.CREDIT,
                        description: `Paiement facture ${invoice.number}`,
                        createdBy: cashierId,
                    } });
            }
            const paidAmount = Number(paid._sum.amount ?? 0);
            const total = Number(invoice.total);
            const paymentStatus = paidAmount <= 0 ? client_1.PaymentStatus.UNPAID : paidAmount >= total ? client_1.PaymentStatus.PAID : client_1.PaymentStatus.PARTIAL;
            await tx.invoice.update({
                where: { id: dto.invoiceId },
                data: { paidAmount, paymentStatus },
            });
            return payment;
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map
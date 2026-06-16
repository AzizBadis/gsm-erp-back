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
            const payment = await tx.payment.create({
                data: { ...dto, cashierId },
                include: { invoice: true, cashier: true },
            });
            const paid = await tx.payment.aggregate({
                where: { invoiceId: dto.invoiceId },
                _sum: { amount: true },
            });
            const invoice = await tx.invoice.findUniqueOrThrow({ where: { id: dto.invoiceId } });
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
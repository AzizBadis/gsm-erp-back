import { Injectable } from '@nestjs/common';
import { AccountTransactionDirection, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto, cashierId: string) {
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
      if (dto.paymentAccountId) {
        await tx.accountTransaction.create({ data: {
          accountId: dto.paymentAccountId,
          invoiceReference: invoice.number,
          reference: dto.reference,
          amount: dto.amount,
          paymentType: dto.method,
          direction: AccountTransactionDirection.CREDIT,
          description: `Paiement facture ${invoice.number}`,
          createdBy: cashierId,
        } });
      }
      const paidAmount = Number(paid._sum.amount ?? 0);
      const total = Number(invoice.total);
      const paymentStatus = paidAmount <= 0 ? PaymentStatus.UNPAID : paidAmount >= total ? PaymentStatus.PAID : PaymentStatus.PARTIAL;

      await tx.invoice.update({
        where: { id: dto.invoiceId },
        data: { paidAmount, paymentStatus },
      });

      return payment;
    });
  }
}

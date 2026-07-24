import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountTransactionDirection, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto, cashierId: string) {
    return this.prisma.$transaction(async (tx) => {
      const { parts, ...paymentData } = dto;
      const invoice = await tx.invoice.findUnique({
        where: { id: dto.invoiceId },
        include: { payments: { select: { amount: true } } },
      });
      if (!invoice) throw new BadRequestException('Facture introuvable');

      const alreadyPaid = invoice.payments.reduce((sum, item) => sum + Number(item.amount), 0);
      const remaining = Math.max(0, Number(invoice.total) - alreadyPaid);
      if (dto.amount > remaining + 0.001) {
        throw new BadRequestException(`Le montant dépasse le solde restant de ${remaining.toFixed(2)} DT`);
      }
      const allowedCombinations = [['Chèque', 'Espèce'], ['Espèce', 'Traite']];
      if (dto.method === 'Paiement partiel') {
        const methods = (parts ?? []).map((part) => part.method).sort();
        if (!allowedCombinations.some((combination) => [...combination].sort().join('|') === methods.join('|'))) {
          throw new BadRequestException('Combinaison autorisée: Espèce + Chèque ou Espèce + Traite');
        }
        const partsTotal = (parts ?? []).reduce((sum, part) => sum + part.amount, 0);
        if (Math.abs(partsTotal - dto.amount) > 0.001) throw new BadRequestException('La somme des paiements partiels doit correspondre au montant');
      } else if (parts?.length) throw new BadRequestException('Les détails partiels nécessitent le type Paiement partiel');
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

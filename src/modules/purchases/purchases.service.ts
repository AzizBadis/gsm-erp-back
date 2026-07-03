import { Injectable } from '@nestjs/common';
import { PurchaseKind, PurchasePaymentStatus, PurchaseStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePurchaseDto, PurchaseFilterDto } from './dto/purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PurchaseFilterDto) {
    const where = {
      ...(query.kind ? { kind: query.kind } : {}),
      ...(query.search ? { OR: [
        { reference: { contains: query.search, mode: 'insensitive' as const } },
        { supplierName: { contains: query.search, mode: 'insensitive' as const } },
        { location: { contains: query.search, mode: 'insensitive' as const } },
      ] } : {}),
    };
    const [data, total] = await Promise.all([
      this.prisma.purchase.findMany({ where, include: { items: { include: { product: true } } }, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { purchaseDate: 'desc' } }),
      this.prisma.purchase.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }

  async create(dto: CreatePurchaseDto, addedBy: string) {
    const subtotal = dto.items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
    const total = Math.max(0, subtotal - (dto.discount ?? 0) + (dto.tax ?? 0) + (dto.shipping ?? 0));
    const paidAmount = Math.min(dto.paidAmount ?? 0, total);
    const paymentStatus = paidAmount <= 0 ? PurchasePaymentStatus.UNPAID : paidAmount >= total ? PurchasePaymentStatus.PAID : PurchasePaymentStatus.PARTIAL;
    return this.prisma.$transaction(async (tx) => {
      const count = await tx.purchase.count({ where: { kind: dto.kind } });
      const prefix = dto.kind === PurchaseKind.REQUEST ? 'PR' : dto.kind === PurchaseKind.ORDER ? 'PO' : dto.kind === PurchaseKind.RETURN ? 'RT' : 'PU';
      return tx.purchase.create({
        data: {
          reference: dto.reference?.trim() || `${prefix}-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`,
          kind: dto.kind,
          supplierName: dto.supplierName,
          location: dto.location ?? 'GPS Tunisie',
          status: dto.status ?? (dto.kind === PurchaseKind.PURCHASE ? PurchaseStatus.RECEIVED : PurchaseStatus.DRAFT),
          paymentStatus,
          purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : new Date(),
          subtotal, discount: dto.discount ?? 0, tax: dto.tax ?? 0, shipping: dto.shipping ?? 0, total, paidAmount,
          notes: dto.notes, addedBy,
          items: { create: dto.items.map(item => ({
            productId: item.productId, productName: item.productName, quantity: item.quantity,
            unitCost: item.unitCost, margin: item.margin ?? 0, salePrice: item.salePrice ?? 0,
            lineTotal: item.quantity * item.unitCost,
          })) },
        },
        include: { items: true },
      });
    });
  }
}

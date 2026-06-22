import { BadRequestException, Injectable } from '@nestjs/common';
import { InvoiceDocumentType } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto, documentType?: InvoiceDocumentType) {
    const searchWhere = query.search
      ? {
          OR: [
            { number: { contains: query.search, mode: 'insensitive' as const } },
            { contact: { fullName: { contains: query.search, mode: 'insensitive' as const } } },
            { repair: { reference: { contains: query.search, mode: 'insensitive' as const } } },
          ],
        }
      : {};
    const where = { ...searchWhere, ...(documentType ? { documentType } : {}) };
    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where,
        include: { items: true, contact: true, repair: true, payments: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.invoice.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }

  async create(dto: CreateInvoiceDto) {
    if (!dto.items.length) throw new BadRequestException('Invoice must include at least one item');
    const subtotal = dto.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = dto.tax ?? 0;
    const discount = dto.discount ?? 0;
    const total = Math.max(0, subtotal - discount + tax);
    return this.prisma.$transaction(async (tx) => {
      const count = await tx.invoice.count();
      return tx.invoice.create({
        data: {
          number: `INV-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`,
          contactId: dto.contactId,
          repairId: dto.repairId,
          subtotal,
          tax,
          total,
          discount,
          documentType: dto.documentType,
          status: dto.status,
          shippingStatus: dto.shippingStatus,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.quantity * item.unitPrice,
            })),
          },
        },
        include: { items: true, contact: true, repair: true, payments: true },
      });
    });
  }
}

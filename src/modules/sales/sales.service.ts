import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDiscountDto, CreateSalesImportDto } from './dto/sales.dto';
@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}
  listDiscounts() { return this.prisma.salesDiscount.findMany({ orderBy: { createdAt: 'desc' } }); }
  createDiscount(dto: CreateDiscountDto) { return this.prisma.salesDiscount.create({ data: { ...dto, startsAt: dto.startsAt ? new Date(dto.startsAt) : undefined, endsAt: dto.endsAt ? new Date(dto.endsAt) : undefined } }); }
  listImports() { return this.prisma.salesImport.findMany({ orderBy: { createdAt: 'desc' } }); }
  createImport(dto: CreateSalesImportDto, createdBy: string) { return this.prisma.salesImport.create({ data: { ...dto, createdBy } }); }
}

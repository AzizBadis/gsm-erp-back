import { Injectable } from '@nestjs/common';
import { StockMovementType } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateProductDto) {
    const sku = dto.sku?.trim() || await this.nextSku(dto.name);
    const barcode = dto.barcode?.trim() || this.barcodeFromSku(sku);
    return this.prisma.product.create({ data: { ...dto, sku, barcode } });
  }
  async findAll(query: PaginationDto) {
    const where = query.search ? { OR: [
      { name: { contains: query.search, mode: 'insensitive' as const } },
      { sku: { contains: query.search, mode: 'insensitive' as const } },
      { barcode: { contains: query.search, mode: 'insensitive' as const } },
      { brand: { contains: query.search, mode: 'insensitive' as const } },
      { category: { contains: query.search, mode: 'insensitive' as const } },
    ] } : {};
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
      this.prisma.product.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }
  findOne(id: string) { return this.prisma.product.findUniqueOrThrow({ where: { id }, include: { movements: true } }); }
  update(id: string, dto: UpdateProductDto) { return this.prisma.product.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.product.delete({ where: { id }, select: { id: true } }); }
  async movements(query: PaginationDto) {
    const where = query.search ? {
      product: {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' as const } },
          { sku: { contains: query.search, mode: 'insensitive' as const } },
          { barcode: { contains: query.search, mode: 'insensitive' as const } },
        ],
      },
    } : {};
    const [data, total] = await Promise.all([
      this.prisma.stockMovement.findMany({
        where,
        include: { product: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.stockMovement.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }

  private async nextSku(name: string) {
    const prefix = this.slugPrefix(name);
    const count = await this.prisma.product.count({
      where: { sku: { startsWith: prefix } },
    });
    return `${prefix}-${String(count + 1).padStart(5, '0')}`;
  }

  private slugPrefix(name: string) {
    const cleaned = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '').toUpperCase();
    return `SKU-${(cleaned || 'PROD').slice(0, 6)}`;
  }

  private barcodeFromSku(sku: string) {
    const digits = sku.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `20${String(digits).padStart(10, '0').slice(-10)}`;
  }
}

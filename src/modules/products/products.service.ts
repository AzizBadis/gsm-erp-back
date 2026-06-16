import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateProductDto) { return this.prisma.product.create({ data: dto }); }
  async findAll(query: PaginationDto) {
    const where = query.search ? { OR: [{ name: { contains: query.search, mode: 'insensitive' as const } }, { sku: { contains: query.search, mode: 'insensitive' as const } }] } : {};
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
      this.prisma.product.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }
  findOne(id: string) { return this.prisma.product.findUniqueOrThrow({ where: { id }, include: { movements: true } }); }
  update(id: string, dto: UpdateProductDto) { return this.prisma.product.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.product.delete({ where: { id }, select: { id: true } }); }
}

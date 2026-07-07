import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateBrandDto) { return this.prisma.brand.create({ data: dto }); }
  async findAll(query: PaginationDto) {
    const where = query.search ? { name: { contains: query.search, mode: 'insensitive' as const } } : {};
    const [data, total] = await Promise.all([
      this.prisma.brand.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
      this.prisma.brand.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }
  findOne(id: string) { return this.prisma.brand.findUniqueOrThrow({ where: { id } }); }
  update(id: string, dto: UpdateBrandDto) { return this.prisma.brand.update({ where: { id }, data: dto }); }
  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.deviceModel.deleteMany({ where: { brandId: id } });
      return tx.brand.delete({ where: { id }, select: { id: true } });
    });
  }
}

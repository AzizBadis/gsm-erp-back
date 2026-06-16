import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTechnicianDto, UpdateTechnicianDto } from './dto/technician.dto';

@Injectable()
export class TechniciansService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTechnicianDto) {
    return this.prisma.technician.create({ data: dto, include: { user: true } });
  }

  async findAll(query: PaginationDto) {
    const where = query.search
      ? { user: { fullName: { contains: query.search, mode: 'insensitive' as const } } }
      : {};
    const [data, total] = await Promise.all([
      this.prisma.technician.findMany({
        where,
        include: { user: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.technician.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }

  findOne(id: string) {
    return this.prisma.technician.findUniqueOrThrow({ where: { id }, include: { user: true, repairs: true } });
  }

  update(id: string, dto: UpdateTechnicianDto) {
    return this.prisma.technician.update({ where: { id }, data: dto, include: { user: true } });
  }

  remove(id: string) {
    return this.prisma.technician.delete({ where: { id }, select: { id: true } });
  }
}

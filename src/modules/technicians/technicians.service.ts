import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTechnicianDto, UpdateTechnicianDto } from './dto/technician.dto';

@Injectable()
export class TechniciansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTechnicianDto) {
    const { userId, specialty } = dto;

    if (userId) {
      return this.prisma.$transaction(async (tx) => {
        await tx.user.update({ where: { id: userId }, data: { role: UserRole.TECHNICIAN } });
        return tx.technician.create({
          data: { userId, specialty },
          include: { user: true },
        });
      });
    }

    const { fullName, email, password } = dto;
    if (!fullName || !email || !password) {
      throw new BadRequestException('fullName, email and password are required when userId is not provided');
    }

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          fullName,
          role: UserRole.TECHNICIAN,
          passwordHash: await bcrypt.hash(password, 12),
        },
      });

      return tx.technician.create({
        data: { userId: user.id, specialty },
        include: { user: true },
      });
    });
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

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGrhRecordDto, UpdateGrhRecordDto } from './dto/grh-record.dto';

const TYPES = ['leave-types', 'leaves', 'attendance', 'payroll', 'holidays', 'departments', 'positions', 'targets'] as const;

@Injectable()
export class GrhService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [users, grouped, pendingLeaves, presentToday, payroll] = await Promise.all([
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.grhRecord.groupBy({ by: ['type'], _count: { _all: true } }),
      this.prisma.grhRecord.count({ where: { type: 'leaves', data: { path: ['status'], equals: 'En attente' } } }),
      this.prisma.grhRecord.count({ where: { type: 'attendance', data: { path: ['status'], equals: 'Présent' } } }),
      this.prisma.grhRecord.findMany({ where: { type: 'payroll' }, select: { data: true } }),
    ]);
    const counts = Object.fromEntries(TYPES.map((type) => [type, grouped.find((item) => item.type === type)?._count._all ?? 0]));
    const payrollTotal = payroll.reduce((total, record) => {
      const data = record.data as Record<string, unknown>;
      return total + (Number(data.amount) || 0);
    }, 0);
    return { activeEmployees: users, presentToday, pendingLeaves, payrollTotal, counts };
  }

  async findAll(type: string, search?: string) {
    this.assertType(type);
    return this.prisma.grhRecord.findMany({
      where: { type, ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}) },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(type: string, dto: CreateGrhRecordDto) {
    this.assertType(type);
    return this.prisma.grhRecord.create({ data: { type, name: dto.name, description: dto.description, data: (dto.data ?? {}) as Prisma.InputJsonValue } });
  }

  update(id: string, dto: UpdateGrhRecordDto) {
    return this.prisma.grhRecord.update({ where: { id }, data: { ...dto, data: dto.data as Prisma.InputJsonValue | undefined } });
  }

  remove(id: string) {
    return this.prisma.grhRecord.delete({ where: { id }, select: { id: true } });
  }

  private assertType(type: string) {
    if (!TYPES.includes(type as typeof TYPES[number])) throw new Error('Invalid GRH record type');
  }
}

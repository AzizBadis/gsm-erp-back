import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(from?: string, to?: string, location?: string) {
    return this.prisma.reservation.findMany({
      where: {
        ...(from || to
          ? { startsAt: { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) } }
          : {}),
        ...(location ? { location } : {}),
      },
      include: { contact: true },
      orderBy: { startsAt: 'asc' },
    });
  }

  async create(dto: CreateReservationDto, createdBy: string) {
    const start = new Date(dto.startsAt);
    const end = new Date(dto.endsAt);
    if (end <= start) throw new BadRequestException('Reservation end must be after start');

    const count = dto.repeatCount ?? 1;
    const recurrenceId = count > 1 ? randomUUID() : undefined;
    const operations = Array.from({ length: count }, (_, index) => {
      const startsAt = new Date(start);
      const endsAt = new Date(end);
      const step = (dto.repeatEvery ?? 1) * index;
      if (dto.repeatUnit === 'WEEK') {
        startsAt.setDate(startsAt.getDate() + step * 7);
        endsAt.setDate(endsAt.getDate() + step * 7);
      } else if (dto.repeatUnit === 'MONTH') {
        startsAt.setMonth(startsAt.getMonth() + step);
        endsAt.setMonth(endsAt.getMonth() + step);
      } else {
        startsAt.setDate(startsAt.getDate() + step);
        endsAt.setDate(endsAt.getDate() + step);
      }
      const { repeatEvery, repeatUnit, repeatCount, ...base } = dto;
      return this.prisma.reservation.create({
        data: { ...base, startsAt, endsAt, recurrenceId, createdBy },
        include: { contact: true },
      });
    });
    return this.prisma.$transaction(operations);
  }

  updateStatus(id: string, status: ReservationStatus) {
    return this.prisma.reservation.update({ where: { id }, data: { status }, include: { contact: true } });
  }
}

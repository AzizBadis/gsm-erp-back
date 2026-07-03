import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AbonnementStatus, Prisma } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAbonnementDto, UpdateAbonnementDto } from './dto/abonnement.dto';

@Injectable()
export class AbonnementsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto & { contactId?: string; status?: AbonnementStatus }) {
    const where: Prisma.AbonnementWhereInput = {
      ...(query.contactId ? { contactId: query.contactId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { label: { contains: query.search, mode: 'insensitive' } },
              { notes: { contains: query.search, mode: 'insensitive' } },
              { contact: { fullName: { contains: query.search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };
    const [data, total] = await Promise.all([
      this.prisma.abonnement.findMany({
        where,
        include: { contact: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: [{ endsAt: 'desc' }, { createdAt: 'desc' }],
      }),
      this.prisma.abonnement.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }

  async create(dto: CreateAbonnementDto) {
    await this.ensureContact(dto.contactId);
    const { startsAt, endsAt } = this.parsePeriod(dto.startsAt, dto.endsAt);
    return this.prisma.abonnement.create({
      data: { ...dto, startsAt, endsAt, amount: dto.amount ?? 0 },
      include: { contact: true },
    });
  }

  async update(id: string, dto: UpdateAbonnementDto) {
    const current = await this.prisma.abonnement.findUniqueOrThrow({ where: { id } });
    const { startsAt, endsAt } = this.parsePeriod(
      dto.startsAt ?? current.startsAt.toISOString(),
      dto.endsAt ?? current.endsAt.toISOString(),
    );
    return this.prisma.abonnement.update({
      where: { id },
      data: { ...dto, startsAt, endsAt },
      include: { contact: true },
    });
  }

  remove(id: string) {
    return this.prisma.abonnement.delete({ where: { id }, select: { id: true } });
  }

  private parsePeriod(startsAtValue: string, endsAtValue: string) {
    const startsAt = new Date(startsAtValue);
    const endsAt = new Date(endsAtValue);
    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      throw new BadRequestException('Invalid abonnement period');
    }
    if (endsAt <= startsAt) throw new BadRequestException('Abonnement end must be after start');
    return { startsAt, endsAt };
  }

  private async ensureContact(contactId: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId }, select: { id: true } });
    if (!contact) throw new NotFoundException('Contact not found');
  }
}

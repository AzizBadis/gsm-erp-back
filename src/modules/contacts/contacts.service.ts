import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateContactDto) { return this.prisma.contact.create({ data: dto }); }
  async findAll(query: PaginationDto) {
    const where = query.search ? { OR: [{ fullName: { contains: query.search, mode: 'insensitive' as const } }, { phone: { contains: query.search, mode: 'insensitive' as const } }] } : {};
    const [data, total] = await Promise.all([
      this.prisma.contact.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.contact.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }
  findOne(id: string) { return this.prisma.contact.findUniqueOrThrow({ where: { id } }); }
  update(id: string, dto: UpdateContactDto) { return this.prisma.contact.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.contact.delete({ where: { id }, select: { id: true } }); }
}

import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        role: dto.role,
        isActive: dto.isActive ?? true,
        passwordHash: await bcrypt.hash(dto.password, 12),
      },
    });
    return this.publicUser(user);
  }

  async findAll(query: PaginationDto) {
    const where = query.search
      ? { OR: [{ fullName: { contains: query.search, mode: 'insensitive' as const } }, { email: { contains: query.search, mode: 'insensitive' as const } }] }
      : {};
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { data: data.map((user) => this.publicUser(user)), total, page: query.page, limit: query.limit };
  }

  async findOne(id: string) {
    return this.publicUser(await this.prisma.user.findUniqueOrThrow({ where: { id }, include: { technician: true } }));
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: Record<string, unknown> = { ...dto };
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 12);
      delete data.password;
    }
    return this.publicUser(await this.prisma.user.update({ where: { id }, data }));
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id }, select: { id: true } });
  }

  private publicUser(user: { passwordHash: string; [key: string]: unknown }) {
    const { passwordHash: _, ...publicUser } = user;
    return publicUser;
  }
}

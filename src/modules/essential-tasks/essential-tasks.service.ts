import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEssentialTaskDto, UpdateEssentialTaskDto } from './dto/essential-task.dto';

@Injectable()
export class EssentialTasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEssentialTaskDto) {
    return this.prisma.essentialTask.create({
      data: {
        title: dto.title,
        status: dto.status,
        priority: dto.priority,
        startAt: dto.startAt ? new Date(dto.startAt) : undefined,
        endAt: dto.endAt ? new Date(dto.endAt) : undefined,
        estimatedHours: dto.estimatedHours,
        assignedTo: dto.assignedTo,
        documents: dto.documents,
        reference: await this.nextReference(),
      },
    });
  }

  async findAll(query: PaginationDto) {
    const where = query.search
      ? {
          OR: [
            { reference: { contains: query.search, mode: 'insensitive' as const } },
            { title: { contains: query.search, mode: 'insensitive' as const } },
            { assignedTo: { contains: query.search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.essentialTask.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.essentialTask.count({ where }),
    ]);

    return { data, total, page: query.page, limit: query.limit };
  }

  findOne(id: string) {
    return this.prisma.essentialTask.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, dto: UpdateEssentialTaskDto) {
    return this.prisma.essentialTask.update({ where: { id }, data: this.toTaskData(dto) });
  }

  remove(id: string) {
    return this.prisma.essentialTask.delete({ where: { id }, select: { id: true } });
  }

  private toTaskData(dto: CreateEssentialTaskDto | UpdateEssentialTaskDto) {
    return {
      ...dto,
      startAt: dto.startAt ? new Date(dto.startAt) : undefined,
      endAt: dto.endAt ? new Date(dto.endAt) : undefined,
    };
  }

  private async nextReference() {
    const year = new Date().getFullYear();
    const count = await this.prisma.essentialTask.count({
      where: {
        reference: {
          startsWith: `${year}/`,
        },
      },
    });

    return `${year}/${String(count + 1).padStart(4, '0')}`;
  }
}

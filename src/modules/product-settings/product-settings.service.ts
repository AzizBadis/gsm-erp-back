import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto/product-setting.dto';

const TYPES = [
  'categories',
  'units',
  'warranties',
  'price-groups',
  'variations',
  'labels',
  'import-jobs',
  'price-updates',
  'initial-stock-imports',
] as const;

@Injectable()
export class ProductSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(type: string, search?: string) {
    this.assertType(type);
    return this.prisma.grhRecord.findMany({
      where: {
        type: this.storageType(type),
        ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(type: string, dto: CreateProductSettingDto) {
    this.assertType(type);
    return this.prisma.grhRecord.create({
      data: {
        type: this.storageType(type),
        name: dto.name,
        description: dto.description,
        data: (dto.data ?? {}) as Prisma.InputJsonValue,
      },
    });
  }

  update(id: string, dto: UpdateProductSettingDto) {
    return this.prisma.grhRecord.update({
      where: { id },
      data: { ...dto, data: dto.data as Prisma.InputJsonValue | undefined },
    });
  }

  remove(id: string) {
    return this.prisma.grhRecord.delete({ where: { id }, select: { id: true } });
  }

  private storageType(type: string) {
    return `product-${type}`;
  }

  private assertType(type: string) {
    if (!TYPES.includes(type as typeof TYPES[number])) {
      throw new BadRequestException('Invalid product setting type');
    }
  }
}

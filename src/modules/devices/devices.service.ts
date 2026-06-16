import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeviceDto, CreateDeviceModelDto, UpdateDeviceDto, UpdateDeviceModelDto } from './dto/device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDeviceDto) { return this.prisma.device.create({ data: dto }); }
  async findAll(query: PaginationDto) {
    const where = query.search ? { name: { contains: query.search, mode: 'insensitive' as const } } : {};
    const [data, total] = await Promise.all([
      this.prisma.device.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
      this.prisma.device.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }
  findOne(id: string) { return this.prisma.device.findUniqueOrThrow({ where: { id } }); }
  update(id: string, dto: UpdateDeviceDto) { return this.prisma.device.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.device.delete({ where: { id }, select: { id: true } }); }

  createModel(dto: CreateDeviceModelDto) { return this.prisma.deviceModel.create({ data: dto, include: { brand: true, device: true } }); }
  async findModels(query: PaginationDto) {
    const where = query.search ? { name: { contains: query.search, mode: 'insensitive' as const } } : {};
    const [data, total] = await Promise.all([
      this.prisma.deviceModel.findMany({ where, include: { brand: true, device: true }, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
      this.prisma.deviceModel.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }
  findModel(id: string) { return this.prisma.deviceModel.findUniqueOrThrow({ where: { id }, include: { brand: true, device: true } }); }
  updateModel(id: string, dto: UpdateDeviceModelDto) { return this.prisma.deviceModel.update({ where: { id }, data: dto, include: { brand: true, device: true } }); }
  removeModel(id: string) { return this.prisma.deviceModel.delete({ where: { id }, select: { id: true } }); }
}

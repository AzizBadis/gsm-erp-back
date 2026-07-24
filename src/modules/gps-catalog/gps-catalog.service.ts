import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCatalogItemDto, UpdateCatalogItemDto } from './gps-catalog.dto';

@Injectable()
export class GpsCatalogService {
  constructor(private readonly prisma: PrismaService) {}
  listModels() { return this.prisma.gpsModel.findMany({ orderBy: { name: 'asc' } }); }
  createModel(dto: CreateCatalogItemDto) { return this.prisma.gpsModel.create({ data: { name: dto.name.trim() } }); }
  updateModel(id: string, dto: UpdateCatalogItemDto) { return this.prisma.gpsModel.update({ where: { id }, data: dto }); }
  deleteModel(id: string) { return this.prisma.gpsModel.delete({ where: { id }, select: { id: true } }); }
  listOperators() { return this.prisma.operator.findMany({ orderBy: { name: 'asc' } }); }
  createOperator(dto: CreateCatalogItemDto) { return this.prisma.operator.create({ data: { name: dto.name.trim() } }); }
  updateOperator(id: string, dto: UpdateCatalogItemDto) { return this.prisma.operator.update({ where: { id }, data: dto }); }
  deleteOperator(id: string) { return this.prisma.operator.delete({ where: { id }, select: { id: true } }); }
}

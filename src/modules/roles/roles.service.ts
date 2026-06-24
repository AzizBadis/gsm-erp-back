import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRoleDto) {
    return this.prisma.roleDefinition.create({ data: dto });
  }

  findAll() {
    return this.prisma.roleDefinition.findMany({ orderBy: { name: 'asc' } });
  }

  update(id: string, dto: UpdateRoleDto) {
    return this.prisma.roleDefinition.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.roleDefinition.delete({ where: { id }, select: { id: true } });
  }
}

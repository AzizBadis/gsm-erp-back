import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Post() create(@Body() dto: CreateRoleDto) { return this.roles.create(dto); }
  @Get() findAll() { return this.roles.findAll(); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateRoleDto) { return this.roles.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.roles.remove(id); }
}

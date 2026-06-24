import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, type AuthUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateEssentialTaskDto, UpdateEssentialTaskDto } from './dto/essential-task.dto';
import { EssentialTasksService } from './essential-tasks.service';

@Controller('essential-tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class EssentialTasksController {
  constructor(private readonly service: EssentialTasksService) {}

  @Post()
  create(@Body() dto: CreateEssentialTaskDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get('mine')
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.CASHIER, UserRole.STAFF)
  findMine(@Query() query: PaginationDto, @CurrentUser() user: AuthUser) {
    return this.service.findMine(query, user);
  }

  @Patch('mine/:id/status')
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.CASHIER, UserRole.STAFF)
  updateMineStatus(@Param('id') id: string, @Body('status') status: UpdateEssentialTaskDto['status'], @CurrentUser() user: AuthUser) {
    return this.service.updateMineStatus(id, status, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEssentialTaskDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

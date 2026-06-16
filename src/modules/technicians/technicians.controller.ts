import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateTechnicianDto, UpdateTechnicianDto } from './dto/technician.dto';
import { TechniciansService } from './technicians.service';

@Controller('technicians')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class TechniciansController {
  constructor(private readonly service: TechniciansService) {}
  @Post() create(@Body() dto: CreateTechnicianDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: PaginationDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateTechnicianDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}

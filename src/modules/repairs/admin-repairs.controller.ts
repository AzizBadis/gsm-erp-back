import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RepairStatus, UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AssignRepairDto, CreateRepairDto, UpdateRepairStatusDto } from './dto/repair.dto';
import { RepairsService } from './repairs.service';

@Controller('repairs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminRepairsController {
  constructor(private readonly repairs: RepairsService) {}
  @Post() create(@Body() dto: CreateRepairDto) { return this.repairs.create(dto); }
  @Get() findAll(@Query() query: RepairFilterDto) { return this.repairs.findAll(query); }
  @Get('statuses') statuses() { return Object.values(RepairStatus); }
  @Get(':id') findOne(@Param('id') id: string) { return this.repairs.findOne(id); }
  @Patch(':id/assign') assign(@Param('id') id: string, @Body() dto: AssignRepairDto) { return this.repairs.assign(id, dto); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body() dto: UpdateRepairStatusDto) { return this.repairs.updateStatus(id, dto); }
}

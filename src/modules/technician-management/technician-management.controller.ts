import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { TechnicianManagementService } from './technician-management.service';
import {
  CreateRepairTypeDto,
  UpdateRepairTypeDto,
  BulkSaveRepairTypesDto,
  BulkSaveStatusMappingsDto,
  CommissionQueryDto,
} from './dto/technician-management.dto';

@Controller('technician-management')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class TechnicianManagementController {
  constructor(private readonly service: TechnicianManagementService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.service.getDashboardStats();
  }

  @Get('commissions')
  getCommissions(@Query() query: CommissionQueryDto) {
    return this.service.getCommissions(query);
  }

  @Get('repair-types')
  getRepairTypes() {
    return this.service.getRepairTypes();
  }

  @Post('repair-types')
  createRepairType(@Body() dto: CreateRepairTypeDto) {
    return this.service.createRepairType(dto);
  }

  @Patch('repair-types/:id')
  updateRepairType(@Param('id') id: string, @Body() dto: UpdateRepairTypeDto) {
    return this.service.updateRepairType(id, dto);
  }

  @Delete('repair-types/:id')
  deleteRepairType(@Param('id') id: string) {
    return this.service.deleteRepairType(id);
  }

  @Put('repair-types/bulk')
  bulkSaveRepairTypes(@Body() dto: BulkSaveRepairTypesDto) {
    return this.service.bulkSaveRepairTypes(dto.types);
  }

  @Get('status-mappings')
  getStatusMappings() {
    return this.service.getStatusMappings();
  }

  @Post('status-mappings')
  createStatusMapping(@Body() dto: { event: string; status: string }) {
    return this.service.createStatusMapping(dto);
  }

  @Patch('status-mappings/:id')
  updateStatusMapping(@Param('id') id: string, @Body() dto: { event?: string; status?: string }) {
    return this.service.updateStatusMapping(id, dto);
  }

  @Delete('status-mappings/:id')
  deleteStatusMapping(@Param('id') id: string) {
    return this.service.deleteStatusMapping(id);
  }

  @Put('status-mappings/bulk')
  bulkSaveStatusMappings(@Body() dto: BulkSaveStatusMappingsDto) {
    return this.service.bulkSaveStatusMappings(dto.mappings);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, CreateDeviceModelDto, UpdateDeviceDto, UpdateDeviceModelDto } from './dto/device.dto';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class DevicesController {
  constructor(private readonly service: DevicesService) {}

  @Post('devices') create(@Body() dto: CreateDeviceDto) { return this.service.create(dto); }
  @Get('devices') findAll(@Query() query: PaginationDto) { return this.service.findAll(query); }
  @Get('devices/:id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch('devices/:id') update(@Param('id') id: string, @Body() dto: UpdateDeviceDto) { return this.service.update(id, dto); }
  @Delete('devices/:id') remove(@Param('id') id: string) { return this.service.remove(id); }

  @Post('device-models') createModel(@Body() dto: CreateDeviceModelDto) { return this.service.createModel(dto); }
  @Get('device-models') findModels(@Query() query: PaginationDto) { return this.service.findModels(query); }
  @Get('device-models/:id') findModel(@Param('id') id: string) { return this.service.findModel(id); }
  @Patch('device-models/:id') updateModel(@Param('id') id: string, @Body() dto: UpdateDeviceModelDto) { return this.service.updateModel(id, dto); }
  @Delete('device-models/:id') removeModel(@Param('id') id: string) { return this.service.removeModel(id); }
}

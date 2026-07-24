import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateCatalogItemDto, UpdateCatalogItemDto } from './gps-catalog.dto';
import { GpsCatalogService } from './gps-catalog.service';

@Controller() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.ADMIN)
export class GpsCatalogController {
  constructor(private readonly service: GpsCatalogService) {}
  @Get('gps-models') models() { return this.service.listModels(); }
  @Post('gps-models') createModel(@Body() dto: CreateCatalogItemDto) { return this.service.createModel(dto); }
  @Patch('gps-models/:id') updateModel(@Param('id') id: string, @Body() dto: UpdateCatalogItemDto) { return this.service.updateModel(id, dto); }
  @Delete('gps-models/:id') deleteModel(@Param('id') id: string) { return this.service.deleteModel(id); }
  @Get('operators') operators() { return this.service.listOperators(); }
  @Post('operators') createOperator(@Body() dto: CreateCatalogItemDto) { return this.service.createOperator(dto); }
  @Patch('operators/:id') updateOperator(@Param('id') id: string, @Body() dto: UpdateCatalogItemDto) { return this.service.updateOperator(id, dto); }
  @Delete('operators/:id') deleteOperator(@Param('id') id: string) { return this.service.deleteOperator(id); }
}

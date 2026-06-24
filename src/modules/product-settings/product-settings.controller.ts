import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto/product-setting.dto';
import { ProductSettingsService } from './product-settings.service';

@Controller('product-settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ProductSettingsController {
  constructor(private readonly settings: ProductSettingsService) {}

  @Get(':type')
  findAll(@Param('type') type: string, @Query('search') search?: string) {
    return this.settings.findAll(type, search);
  }

  @Post(':type')
  create(@Param('type') type: string, @Body() dto: CreateProductSettingDto) {
    return this.settings.create(type, dto);
  }

  @Patch('records/:id')
  update(@Param('id') id: string, @Body() dto: UpdateProductSettingDto) {
    return this.settings.update(id, dto);
  }

  @Delete('records/:id')
  remove(@Param('id') id: string) {
    return this.settings.remove(id);
  }
}

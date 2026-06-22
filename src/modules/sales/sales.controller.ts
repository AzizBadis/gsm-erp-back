import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, type AuthUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateDiscountDto, CreateSalesImportDto } from './dto/sales.dto';
import { SalesService } from './sales.service';
@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class SalesController {
  constructor(private readonly service: SalesService) {}
  @Get('discounts') listDiscounts() { return this.service.listDiscounts(); }
  @Post('discounts') createDiscount(@Body() dto: CreateDiscountDto) { return this.service.createDiscount(dto); }
  @Get('imports') listImports() { return this.service.listImports(); }
  @Post('imports') createImport(@Body() dto: CreateSalesImportDto, @CurrentUser() user: AuthUser) { return this.service.createImport(dto, user.email); }
}

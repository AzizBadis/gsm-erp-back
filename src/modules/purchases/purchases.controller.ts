import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PurchaseKind, UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}
  @Get() findAll(@Query() query: PaginationDto, @Query('kind') kind?: PurchaseKind) { return this.service.findAll(query, kind); }
  @Post() create(@Body() dto: CreatePurchaseDto, @CurrentUser() user: { fullName: string; email: string }) { return this.service.create(dto, user.fullName || user.email); }
}

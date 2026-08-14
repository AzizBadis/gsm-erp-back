import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreatePurchaseDto, PurchaseFilterDto, RecordPurchasePaymentDto } from './dto/purchase.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}
  @Get() findAll(@Query() query: PurchaseFilterDto) { return this.service.findAll(query); }
  @Post() create(@Body() dto: CreatePurchaseDto, @CurrentUser() user: { fullName: string; email: string }) { return this.service.create(dto, user.fullName || user.email); }
  @Post(':id/payments') recordPayment(@Param('id') id: string, @Body() dto: RecordPurchasePaymentDto, @CurrentUser() user: { fullName: string; email: string }) { return this.service.recordPayment(id, dto, user.fullName || user.email); }
}

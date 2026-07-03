import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateInvoiceDto, InvoiceFilterDto } from './dto/invoice.dto';
import { InvoicesService } from './invoices.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoicesController {
  constructor(private readonly service: InvoicesService) {}

  @Get('invoices')
  @Roles(UserRole.ADMIN, UserRole.CASHIER)
  findAll(@Query() query: InvoiceFilterDto) {
    return this.service.findAll(query);
  }

  @Post('cashier/invoices')
  @Roles(UserRole.ADMIN, UserRole.CASHIER)
  create(@Body() dto: CreateInvoiceDto) {
    return this.service.create(dto);
  }
}

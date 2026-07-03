import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, type AuthUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateAccountTransactionDto, CreatePaymentAccountDto, UpdatePaymentAccountDto } from './dto/payment-account.dto';
import { PaymentAccountsService } from './payment-accounts.service';

@Controller('payment-accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class PaymentAccountsController {
  constructor(private readonly service: PaymentAccountsService) {}

  @Get()
  accounts() {
    return this.service.accounts();
  }

  @Post()
  create(@Body() dto: CreatePaymentAccountDto, @CurrentUser() user: AuthUser) {
    return this.service.createAccount(dto, user.email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentAccountDto) {
    return this.service.updateAccount(id, dto);
  }

  @Get('transactions')
  transactions(@Query() query: PaginationDto) {
    return this.service.transactions(query);
  }

  @Post('transactions')
  createTransaction(@Body() dto: CreateAccountTransactionDto, @CurrentUser() user: AuthUser) {
    return this.service.createTransaction(dto, user.email);
  }

  @Get('trial-balance')
  trial() {
    return this.service.trialBalance();
  }
}

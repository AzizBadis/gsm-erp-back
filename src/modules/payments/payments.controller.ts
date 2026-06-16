import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreatePaymentDto } from './dto/payment.dto';
import { PaymentsService } from './payments.service';

@Controller('cashier/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.CASHIER)
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}
  @Post() create(@Body() dto: CreatePaymentDto, @CurrentUser() user: AuthUser) { return this.service.create(dto, user.sub); }
}

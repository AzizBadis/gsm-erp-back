import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RepairsService } from '../repairs/repairs.service';

@Controller('cashier/repairs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.CASHIER)
export class CashierRepairsController {
  constructor(private readonly repairs: RepairsService) {}
  @Patch(':id/deliver-to-client') deliver(@Param('id') id: string) { return this.repairs.deliverToClient(id); }
}

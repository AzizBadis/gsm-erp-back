import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('admin')
  @Roles(UserRole.ADMIN)
  admin() { return this.dashboard.admin(); }

  @Get('repairs/by-status')
  @Roles(UserRole.ADMIN)
  repairsByStatus() { return this.dashboard.repairsByStatus(); }

  @Get('repairs/by-technician')
  @Roles(UserRole.ADMIN)
  repairsByTechnician() { return this.dashboard.repairsByTechnician(); }

  @Get('cashier/part-requests')
  @Roles(UserRole.ADMIN, UserRole.CASHIER)
  cashierPartRequests() { return this.dashboard.cashierPartRequests(); }

  @Get('technician/my-stats')
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN)
  myStats(@CurrentUser() user: AuthUser) { return this.dashboard.technicianStats(user.technicianId ?? ''); }
}

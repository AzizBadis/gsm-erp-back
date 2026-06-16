import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, AuthUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RequestPartsDto, UpdateRepairNotesDto } from './dto/repair.dto';
import { RepairsService } from './repairs.service';

@Controller('technician')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.TECHNICIAN)
export class TechnicianTasksController {
  constructor(private readonly repairs: RepairsService) {}
  @Get('tasks') tasks(@CurrentUser() user: AuthUser, @Query() query: RepairFilterDto) { return this.repairs.technicianTasks(user.technicianId!, query); }
  @Get('tasks/:id') task(@Param('id') id: string, @CurrentUser() user: AuthUser) { return this.repairs.technicianTask(id, user.technicianId!); }
  @Post('tasks/:id/start') start(@Param('id') id: string, @CurrentUser() user: AuthUser) { return this.repairs.start(id, user.technicianId!); }
  @Post('tasks/:id/pause') pause(@Param('id') id: string, @CurrentUser() user: AuthUser) { return this.repairs.pause(id, user.technicianId!); }
  @Post('tasks/:id/resume') resume(@Param('id') id: string, @CurrentUser() user: AuthUser) { return this.repairs.resume(id, user.technicianId!); }
  @Post('tasks/:id/finish') finish(@Param('id') id: string, @CurrentUser() user: AuthUser) { return this.repairs.finish(id, user.technicianId!); }
  @Post('tasks/:id/request-parts') requestParts(@Param('id') id: string, @CurrentUser() user: AuthUser, @Body() dto: RequestPartsDto) { return this.repairs.requestParts(id, user.technicianId!, dto); }
  @Get('part-requests') partRequests(@CurrentUser() user: AuthUser) { return this.repairs.partRequestsForTechnician(user.technicianId!); }
  @Patch('tasks/:id/notes') notes(@Param('id') id: string, @CurrentUser() user: AuthUser, @Body() dto: UpdateRepairNotesDto) { return this.repairs.updateNotes(id, user.technicianId!, dto); }
}

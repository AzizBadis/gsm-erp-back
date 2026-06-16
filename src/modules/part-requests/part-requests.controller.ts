import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RejectPartRequestDto } from './dto/part-request.dto';
import { PartRequestsService } from './part-requests.service';

@Controller('cashier/part-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.CASHIER)
export class PartRequestsController {
  constructor(private readonly service: PartRequestsService) {}
  @Get() findAll(@Query() query: PaginationDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id/approve') approve(@Param('id') id: string) { return this.service.approve(id); }
  @Patch(':id/reject') reject(@Param('id') id: string, @Body() dto: RejectPartRequestDto) { return this.service.reject(id, dto.reason); }
  @Patch(':id/deliver') deliver(@Param('id') id: string) { return this.service.deliver(id); }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AbonnementStatus, UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AbonnementsService } from './abonnements.service';
import { CreateAbonnementDto, UpdateAbonnementDto } from './dto/abonnement.dto';

@Controller('abonnements')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.CASHIER)
export class AbonnementsController {
  constructor(private readonly service: AbonnementsService) {}

  @Get()
  findAll(@Query() query: PaginationDto & { contactId?: string; status?: AbonnementStatus }) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateAbonnementDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAbonnementDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

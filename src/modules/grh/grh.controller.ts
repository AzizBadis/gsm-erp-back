import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateGrhRecordDto, UpdateGrhRecordDto } from './dto/grh-record.dto';
import { GrhService } from './grh.service';

@Controller('grh')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class GrhController {
  constructor(private readonly grh: GrhService) {}

  @Get('dashboard') dashboard() { return this.grh.dashboard(); }
  @Get(':type') findAll(@Param('type') type: string, @Query('search') search?: string) { return this.grh.findAll(type, search); }
  @Post(':type') create(@Param('type') type: string, @Body() dto: CreateGrhRecordDto) { return this.grh.create(type, dto); }
  @Patch('records/:id') update(@Param('id') id: string, @Body() dto: UpdateGrhRecordDto) { return this.grh.update(id, dto); }
  @Delete('records/:id') remove(@Param('id') id: string) { return this.grh.remove(id); }
}

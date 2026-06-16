import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post() create(@Body() dto: CreateUserDto) { return this.users.create(dto); }
  @Get() findAll(@Query() query: PaginationDto) { return this.users.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.users.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateUserDto) { return this.users.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.users.remove(id); }
}

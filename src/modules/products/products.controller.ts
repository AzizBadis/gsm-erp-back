import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ProductsController {
  constructor(private readonly service: ProductsService) {}
  @Post() create(@Body() dto: CreateProductDto) { return this.service.create(dto); }
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.CASHIER)
  @Get() findAll(@Query() query: PaginationDto) { return this.service.findAll(query); }
  @Roles(UserRole.ADMIN, UserRole.CASHIER)
  @Get('stock/movements') movements(@Query() query: PaginationDto) { return this.service.movements(query); }
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.CASHIER)
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateProductDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}

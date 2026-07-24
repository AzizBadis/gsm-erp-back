import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { InvoiceDocumentType } from '@prisma/client';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class InvoiceFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(InvoiceDocumentType)
  documentType?: InvoiceDocumentType;
}

export class CreateInvoiceItemDto {
  @IsOptional() @IsString() productId?: string;
  @IsString() description: string;
  @Type(() => Number) @IsNumber() @Min(1) quantity: number;
  @Type(() => Number) @IsNumber() @Min(0) unitPrice: number;
}

export class CreateInvoiceDto {
  @IsString() contactId: string;
  @IsOptional() @IsString() repairId?: string;
  @IsOptional() @IsString() employeeId?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) tax?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) discount?: number;
  @IsOptional() @IsEnum(InvoiceDocumentType) documentType?: InvoiceDocumentType;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() shippingStatus?: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => CreateInvoiceItemDto) items: CreateInvoiceItemDto[];
}

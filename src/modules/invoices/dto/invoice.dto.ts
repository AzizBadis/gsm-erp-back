import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsOptional() @IsString() productId?: string;
  @IsString() description: string;
  @Type(() => Number) @IsNumber() @Min(1) quantity: number;
  @Type(() => Number) @IsNumber() @Min(0) unitPrice: number;
}

export class CreateInvoiceDto {
  @IsString() contactId: string;
  @IsOptional() @IsString() repairId?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) tax?: number;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => CreateInvoiceItemDto) items: CreateInvoiceItemDto[];
}

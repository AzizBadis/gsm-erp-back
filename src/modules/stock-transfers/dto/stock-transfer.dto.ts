import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { StockTransferStatus } from '@prisma/client';
export class StockTransferItemDto {
  @IsString() productId: string;
  @Type(()=>Number) @IsInt() @Min(1) quantity: number;
}
export class CreateStockTransferDto {
  @IsOptional() @IsString() reference?: string;
  @IsOptional() @IsDateString() transferDate?: string;
  @IsString() fromLocation: string;
  @IsString() toLocation: string;
  @IsOptional() @IsEnum(StockTransferStatus) status?: StockTransferStatus;
  @IsOptional() @Type(()=>Number) @IsNumber() @Min(0) shippingCharges?: number;
  @IsOptional() @IsString() notes?: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({each:true}) @Type(()=>StockTransferItemDto) items: StockTransferItemDto[];
}

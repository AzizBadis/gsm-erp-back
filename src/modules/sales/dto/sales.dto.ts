import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
export class CreateDiscountDto {
  @IsString() name: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) priority?: number;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() productType?: string;
  @Type(() => Number) @IsNumber() @Min(0) amount: number;
  @IsOptional() @IsString() amountType?: string;
  @IsOptional() @IsString() startsAt?: string;
  @IsOptional() @IsString() endsAt?: string;
  @IsOptional() @IsString() customerGroup?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
export class CreateSalesImportDto {
  @IsString() fileName: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) invoiceCount?: number;
}

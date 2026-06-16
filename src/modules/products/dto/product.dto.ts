import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString() name: string;
  @IsString() sku: string;
  @IsOptional() @IsString() description?: string;
  @Type(() => Number) @IsNumber() @Min(0) unitPrice: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) stockQty?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) minStockQty?: number;
}

export class UpdateProductDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() sku?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) unitPrice?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) stockQty?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) minStockQty?: number;
}

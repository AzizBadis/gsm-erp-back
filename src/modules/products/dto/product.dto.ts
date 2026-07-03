import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

const toOptionalNumber = ({ value }: { value: unknown }) => {
  if (value === '' || value === null || value === undefined) return undefined;
  return Number(value);
};

export class CreateProductDto {
  @IsString() name: string;
  @IsString() sku: string;
  @IsOptional() @IsString() barcode?: string;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() unit?: string;
  @IsOptional() @IsString() warranty?: string;
  @IsOptional() @IsString() productType?: string;
  @IsOptional() @IsString() description?: string;
  @Transform(toOptionalNumber) @IsNumber() @Min(0) unitPrice: number;
  @IsOptional() @Transform(toOptionalNumber) @IsNumber() @Min(0) taxRate?: number;
  @IsOptional() @Transform(toOptionalNumber) @IsInt() @Min(0) stockQty?: number;
  @IsOptional() @Transform(toOptionalNumber) @IsInt() @Min(0) minStockQty?: number;
}

export class UpdateProductDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() sku?: string;
  @IsOptional() @IsString() barcode?: string;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() unit?: string;
  @IsOptional() @IsString() warranty?: string;
  @IsOptional() @IsString() productType?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @Transform(toOptionalNumber) @IsNumber() @Min(0) unitPrice?: number;
  @IsOptional() @Transform(toOptionalNumber) @IsNumber() @Min(0) taxRate?: number;
  @IsOptional() @Transform(toOptionalNumber) @IsInt() @Min(0) stockQty?: number;
  @IsOptional() @Transform(toOptionalNumber) @IsInt() @Min(0) minStockQty?: number;
}

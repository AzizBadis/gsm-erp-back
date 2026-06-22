import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { PurchaseKind, PurchaseStatus } from '@prisma/client';

export class CreatePurchaseItemDto {
  @IsOptional() @IsString() productId?: string;
  @IsString() productName: string;
  @Type(() => Number) @IsNumber() @Min(1) quantity: number;
  @Type(() => Number) @IsNumber() @Min(0) unitCost: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) margin?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) salePrice?: number;
}

export class CreatePurchaseDto {
  @IsEnum(PurchaseKind) kind: PurchaseKind;
  @IsString() supplierName: string;
  @IsOptional() @IsString() reference?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsEnum(PurchaseStatus) status?: PurchaseStatus;
  @IsOptional() @IsDateString() purchaseDate?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) discount?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) tax?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) shipping?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) paidAmount?: number;
  @IsOptional() @IsString() notes?: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => CreatePurchaseItemDto) items: CreatePurchaseItemDto[];
}

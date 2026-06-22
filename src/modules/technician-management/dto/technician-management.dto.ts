import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateRepairTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  commissionRate: number;

  @IsBoolean()
  @IsOptional()
  managedByAdmin?: boolean;
}

export class UpdateRepairTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  commissionRate?: number;

  @IsBoolean()
  @IsOptional()
  managedByAdmin?: boolean;
}

export class BulkRepairTypeItemDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsNumber()
  commissionRate: number;

  @IsBoolean()
  managedByAdmin: boolean;
}

export class BulkSaveRepairTypesDto {
  @ValidateNested({ each: true })
  @Type(() => BulkRepairTypeItemDto)
  types: BulkRepairTypeItemDto[];
}

export class BulkStatusMappingItemDto {
  @IsString()
  event: string;

  @IsString()
  status: string;
}

export class BulkSaveStatusMappingsDto {
  @ValidateNested({ each: true })
  @Type(() => BulkStatusMappingItemDto)
  mappings: BulkStatusMappingItemDto[];
}

export class CommissionQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  technicianId?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}

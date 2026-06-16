import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { RepairStatus } from '@prisma/client';

export class CreateRepairDto {
  @IsString() contactId: string;
  @IsString() deviceId: string;
  @IsOptional() @IsString() deviceModelId?: string;
  @IsOptional() @IsString() technicianId?: string;
  @IsOptional() @IsString() imei?: string;
  @IsString() problem: string;
  @IsOptional() @IsString() diagnosis?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) photos?: string[];
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) estimatedCost?: number;
}

export class AssignRepairDto {
  @IsString() technicianId: string;
}

export class UpdateRepairNotesDto {
  @IsOptional() @IsString() diagnosis?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) photos?: string[];
}

export class UpdateRepairStatusDto {
  @IsEnum(RepairStatus) status: RepairStatus;
}

export class RequestPartItemDto {
  @IsString() productId: string;
  @Type(() => Number) @IsNumber() @Min(1) quantity: number;
}

export class RequestPartsDto {
  @IsOptional() @IsString() reason?: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => RequestPartItemDto) items: RequestPartItemDto[];
}

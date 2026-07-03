import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class CreateRepairDto {
  @IsString() contactId: string;
  @IsString() deviceId: string;
  @IsOptional() @IsString() deviceModelId?: string;
  @IsOptional() @IsString() technicianId?: string;
  @IsOptional() @IsString() repairTypeId?: string;
  @IsOptional() @IsString() imei?: string;
  @IsOptional() @IsString() devicePassword?: string;
  @IsOptional() @IsString() lockReason?: string;
  @IsString() problem: string;
  @IsOptional() @IsString() diagnosis?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) photos?: string[];
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) estimatedCost?: number;
}

export class AssignRepairDto {
  @IsString() technicianId: string;
  @IsOptional() @IsString() repairTypeId?: string;
}

export class UpdateRepairNotesDto {
  @IsOptional() @IsString() diagnosis?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) photos?: string[];
}

export class UpdateRepairStatusDto {
  @IsString() status: string;
}

export class RequestPartItemDto {
  @IsString() productId: string;
  @Type(() => Number) @IsNumber() @Min(1) quantity: number;
}

export class RequestPartsDto {
  @IsOptional() @IsString() reason?: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => RequestPartItemDto) items: RequestPartItemDto[];
}

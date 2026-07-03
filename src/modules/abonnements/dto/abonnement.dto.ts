import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AbonnementStatus } from '@prisma/client';

export class CreateAbonnementDto {
  @IsString() contactId: string;
  @IsString() label: string;
  @IsDateString() startsAt: string;
  @IsDateString() endsAt: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) amount?: number;
  @IsOptional() @IsEnum(AbonnementStatus) status?: AbonnementStatus;
  @IsOptional() @IsString() notes?: string;
}

export class UpdateAbonnementDto {
  @IsOptional() @IsString() label?: string;
  @IsOptional() @IsDateString() startsAt?: string;
  @IsOptional() @IsDateString() endsAt?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) amount?: number;
  @IsOptional() @IsEnum(AbonnementStatus) status?: AbonnementStatus;
  @IsOptional() @IsString() notes?: string;
}

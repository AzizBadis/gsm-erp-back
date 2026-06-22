import { EssentialTaskPriority, EssentialTaskStatus } from '@prisma/client';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateEssentialTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(EssentialTaskStatus)
  status?: EssentialTaskStatus;

  @IsOptional()
  @IsEnum(EssentialTaskPriority)
  priority?: EssentialTaskPriority;

  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  @IsString()
  estimatedHours?: string;

  @IsString()
  assignedTo: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[];
}

export class UpdateEssentialTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(EssentialTaskStatus)
  status?: EssentialTaskStatus;

  @IsOptional()
  @IsEnum(EssentialTaskPriority)
  priority?: EssentialTaskPriority;

  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  @IsString()
  estimatedHours?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[];
}

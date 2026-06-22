import { IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGrhRecordDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}

export class UpdateGrhRecordDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}

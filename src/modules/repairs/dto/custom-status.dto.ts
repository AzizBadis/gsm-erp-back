import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  color?: string;
}

export class UpdateCustomStatusDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  color?: string;
}

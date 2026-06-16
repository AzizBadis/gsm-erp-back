import { IsOptional, IsString } from 'class-validator';

export class CreateTechnicianDto {
  @IsString() userId: string;
  @IsOptional() @IsString() specialty?: string;
}

export class UpdateTechnicianDto {
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsString() specialty?: string;
}

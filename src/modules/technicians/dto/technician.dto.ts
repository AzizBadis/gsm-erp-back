import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTechnicianDto {
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;
  @IsOptional() @IsString() specialty?: string;
}

export class UpdateTechnicianDto {
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsString() specialty?: string;
}

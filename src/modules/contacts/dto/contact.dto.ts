import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString() fullName: string;
  @IsString() phone: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() address?: string;
}

export class UpdateContactDto {
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() address?: string;
}

import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class VerifyOtpDto {
  @IsString()
  challengeId: string;

  @IsString()
  @Length(6, 6)
  code: string;
}

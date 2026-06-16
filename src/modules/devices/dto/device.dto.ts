import { IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto { @IsString() name: string; }
export class UpdateDeviceDto { @IsOptional() @IsString() name?: string; }

export class CreateDeviceModelDto {
  @IsString() name: string;
  @IsString() brandId: string;
  @IsString() deviceId: string;
}

export class UpdateDeviceModelDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() brandId?: string;
  @IsOptional() @IsString() deviceId?: string;
}

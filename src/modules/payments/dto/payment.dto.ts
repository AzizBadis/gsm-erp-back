import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString() invoiceId: string;
  @Type(() => Number) @IsNumber() @Min(0.01) amount: number;
  @IsString() method: string;
  @IsOptional() @IsString() reference?: string;
}

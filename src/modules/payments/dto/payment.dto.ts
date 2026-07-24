import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class PaymentPartDto {
  @IsIn(['Espèce', 'Chèque', 'Traite']) method: string;
  @Type(() => Number) @IsNumber() @Min(0.01) amount: number;
  @IsOptional() @IsString() reference?: string;
}

export class CreatePaymentDto {
  @IsString() invoiceId: string;
  @Type(() => Number) @IsNumber() @Min(0.01) amount: number;
  @IsIn(['Chèque', 'Espèce', 'Traite', 'Paiement partiel']) method: string;
  @IsOptional() @IsString() reference?: string;
  @IsOptional() @IsString() paymentAccountId?: string;
  @IsOptional() @IsArray() @ArrayMinSize(2) @ArrayMaxSize(2)
  @ValidateNested({ each: true }) @Type(() => PaymentPartDto) parts?: PaymentPartDto[];
}

import { IsString } from 'class-validator';

export class RejectPartRequestDto {
  @IsString()
  reason: string;
}

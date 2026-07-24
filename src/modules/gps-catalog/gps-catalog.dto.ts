import { IsOptional, IsString } from 'class-validator';

export class CreateCatalogItemDto { @IsString() name: string; }
export class UpdateCatalogItemDto { @IsOptional() @IsString() name?: string; }

import { Module } from '@nestjs/common';
import { ProductSettingsController } from './product-settings.controller';
import { ProductSettingsService } from './product-settings.service';

@Module({ controllers: [ProductSettingsController], providers: [ProductSettingsService] })
export class ProductSettingsModule {}

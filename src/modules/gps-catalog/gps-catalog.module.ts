import { Module } from '@nestjs/common';
import { GpsCatalogController } from './gps-catalog.controller';
import { GpsCatalogService } from './gps-catalog.service';
@Module({ controllers: [GpsCatalogController], providers: [GpsCatalogService] })
export class GpsCatalogModule {}

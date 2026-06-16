import { Module } from '@nestjs/common';
import { PartRequestsController } from './part-requests.controller';
import { PartRequestsService } from './part-requests.service';

@Module({ controllers: [PartRequestsController], providers: [PartRequestsService] })
export class PartRequestsModule {}

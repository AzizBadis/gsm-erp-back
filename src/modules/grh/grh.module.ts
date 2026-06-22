import { Module } from '@nestjs/common';
import { GrhController } from './grh.controller';
import { GrhService } from './grh.service';

@Module({ controllers: [GrhController], providers: [GrhService] })
export class GrhModule {}

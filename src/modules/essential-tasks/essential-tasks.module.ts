import { Module } from '@nestjs/common';
import { EssentialTasksController } from './essential-tasks.controller';
import { EssentialTasksService } from './essential-tasks.service';

@Module({
  controllers: [EssentialTasksController],
  providers: [EssentialTasksService],
})
export class EssentialTasksModule {}

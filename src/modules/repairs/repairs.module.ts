import { Module } from '@nestjs/common';
import { AdminRepairsController } from './admin-repairs.controller';
import { TechnicianTasksController } from './technician-tasks.controller';
import { RepairsService } from './repairs.service';

@Module({ controllers: [AdminRepairsController, TechnicianTasksController], providers: [RepairsService], exports: [RepairsService] })
export class RepairsModule {}

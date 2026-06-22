import { Module } from '@nestjs/common';
import { AdminRepairsController } from './admin-repairs.controller';
import { TechnicianTasksController } from './technician-tasks.controller';
import { RepairsService } from './repairs.service';
import { TechnicianManagementModule } from '../technician-management/technician-management.module';

@Module({
  imports: [TechnicianManagementModule],
  controllers: [AdminRepairsController, TechnicianTasksController],
  providers: [RepairsService],
  exports: [RepairsService],
})
export class RepairsModule {}

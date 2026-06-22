import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TechnicianManagementController } from './technician-management.controller';
import { TechnicianManagementService } from './technician-management.service';

@Module({
  imports: [PrismaModule],
  controllers: [TechnicianManagementController],
  providers: [TechnicianManagementService],
  exports: [TechnicianManagementService],
})
export class TechnicianManagementModule {}

import { Module } from '@nestjs/common';
import { RepairsModule } from '../repairs/repairs.module';
import { CashierRepairsController } from './cashier-repairs.controller';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({ imports: [RepairsModule], controllers: [PaymentsController, CashierRepairsController], providers: [PaymentsService] })
export class PaymentsModule {}

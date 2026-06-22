import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { TechniciansModule } from './modules/technicians/technicians.module';
import { BrandsModule } from './modules/brands/brands.module';
import { DevicesModule } from './modules/devices/devices.module';
import { ProductsModule } from './modules/products/products.module';
import { RepairsModule } from './modules/repairs/repairs.module';
import { PartRequestsModule } from './modules/part-requests/part-requests.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EssentialTasksModule } from './modules/essential-tasks/essential-tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { TechnicianManagementModule } from './modules/technician-management/technician-management.module';
import { GrhModule } from './modules/grh/grh.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { SalesModule } from './modules/sales/sales.module';
import { StockTransfersModule } from './modules/stock-transfers/stock-transfers.module';
import { StockAdjustmentsModule } from './modules/stock-adjustments/stock-adjustments.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { PaymentAccountsModule } from './modules/payment-accounts/payment-accounts.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { CrmModule } from './modules/crm/crm.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ContactsModule,
    TechniciansModule,
    BrandsModule,
    DevicesModule,
    ProductsModule,
    RepairsModule,
    PartRequestsModule,
    InvoicesModule,
    PaymentsModule,
    DashboardModule,
    EssentialTasksModule,
    TechnicianManagementModule,
    GrhModule,
    PurchasesModule,
    SalesModule,
    StockTransfersModule,
    StockAdjustmentsModule,
    ExpensesModule,
    PaymentAccountsModule,
    ReportsModule,
    ReservationsModule,
    CrmModule,
    ProjectsModule,
  ],
})
export class AppModule {}

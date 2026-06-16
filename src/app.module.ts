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
import { PrismaModule } from './prisma/prisma.module';

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
  ],
})
export class AppModule {}

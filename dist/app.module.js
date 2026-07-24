"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const contacts_module_1 = require("./modules/contacts/contacts.module");
const technicians_module_1 = require("./modules/technicians/technicians.module");
const brands_module_1 = require("./modules/brands/brands.module");
const devices_module_1 = require("./modules/devices/devices.module");
const products_module_1 = require("./modules/products/products.module");
const repairs_module_1 = require("./modules/repairs/repairs.module");
const part_requests_module_1 = require("./modules/part-requests/part-requests.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const payments_module_1 = require("./modules/payments/payments.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const essential_tasks_module_1 = require("./modules/essential-tasks/essential-tasks.module");
const prisma_module_1 = require("./prisma/prisma.module");
const technician_management_module_1 = require("./modules/technician-management/technician-management.module");
const grh_module_1 = require("./modules/grh/grh.module");
const purchases_module_1 = require("./modules/purchases/purchases.module");
const sales_module_1 = require("./modules/sales/sales.module");
const stock_transfers_module_1 = require("./modules/stock-transfers/stock-transfers.module");
const stock_adjustments_module_1 = require("./modules/stock-adjustments/stock-adjustments.module");
const expenses_module_1 = require("./modules/expenses/expenses.module");
const payment_accounts_module_1 = require("./modules/payment-accounts/payment-accounts.module");
const reports_module_1 = require("./modules/reports/reports.module");
const reservations_module_1 = require("./modules/reservations/reservations.module");
const crm_module_1 = require("./modules/crm/crm.module");
const projects_module_1 = require("./modules/projects/projects.module");
const roles_module_1 = require("./modules/roles/roles.module");
const product_settings_module_1 = require("./modules/product-settings/product-settings.module");
const abonnements_module_1 = require("./modules/abonnements/abonnements.module");
const gps_catalog_module_1 = require("./modules/gps-catalog/gps-catalog.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    (0, path_1.join)(__dirname, '..', '.env.local'),
                    (0, path_1.join)(__dirname, '..', '.env'),
                    '.env.local',
                    '.env',
                ],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            contacts_module_1.ContactsModule,
            technicians_module_1.TechniciansModule,
            brands_module_1.BrandsModule,
            devices_module_1.DevicesModule,
            products_module_1.ProductsModule,
            repairs_module_1.RepairsModule,
            part_requests_module_1.PartRequestsModule,
            invoices_module_1.InvoicesModule,
            payments_module_1.PaymentsModule,
            dashboard_module_1.DashboardModule,
            essential_tasks_module_1.EssentialTasksModule,
            technician_management_module_1.TechnicianManagementModule,
            grh_module_1.GrhModule,
            purchases_module_1.PurchasesModule,
            sales_module_1.SalesModule,
            stock_transfers_module_1.StockTransfersModule,
            stock_adjustments_module_1.StockAdjustmentsModule,
            expenses_module_1.ExpensesModule,
            payment_accounts_module_1.PaymentAccountsModule,
            reports_module_1.ReportsModule,
            reservations_module_1.ReservationsModule,
            crm_module_1.CrmModule,
            projects_module_1.ProjectsModule,
            roles_module_1.RoleDefinitionsModule,
            product_settings_module_1.ProductSettingsModule,
            abonnements_module_1.AbonnementsModule,
            gps_catalog_module_1.GpsCatalogModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map